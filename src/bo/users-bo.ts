import { inject, injectable } from "inversify";
import { User } from "../models/user.model";
import { UsersBoContract } from "./users-bo.contract";
import "reflect-metadata";
import { createToken } from "../middlewares/jwt-middleware";
import { AuthDaoContract } from "../dao/auth-dao.contracts";
import diTokens from "../constants/di-tokens";
import bcrypt from "bcrypt";

@injectable()
export class UsersBo implements UsersBoContract {
  constructor(
    @inject(diTokens.USERS_DAO)
    private dao: AuthDaoContract<any>
  ) {}
  async regUser(user: User): Promise<any> {
    try {
      const found = await this.dao.find(user.userName);
      if (found.length) {
        throw new Error("user already exists");
      } else {
        const hashedPwd = await bcrypt.hash(user.password, 12);
        user["password"] = hashedPwd;
        const users = await this.dao.findAll();
        users.push(user);
        return this.dao.register(users);
      }
    } catch (error) {
      throw error;
    }
  }
  async validate(user: User): Promise<string> {
    try {
      const found: any = await this.dao.find(user.userName);
      if (found.length) {
        const validatePwd = await bcrypt.compare(
          user.password,
          found[0].password
        );
        if (validatePwd) return createToken(found[0]);
        throw new Error("Incorrect Password");
      } else {
        throw new Error("invalid user");
      }
    } catch (error) {
      throw error;
    }
  }
}
