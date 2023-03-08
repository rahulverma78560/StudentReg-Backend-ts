import { readFileSync, writeFileSync } from "fs";
import { injectable } from "inversify";
import "reflect-metadata";
import { User } from "../models/user.model";
import { AuthDaoContract } from "./auth-dao.contracts";

const FILE_PATH = process.env.USERS_FILE_PATH || "./src/data/users.json";

@injectable()
export class AuthDao implements AuthDaoContract<User> {
  async register(data: User[]): Promise<void> {
    try {
      writeFileSync(FILE_PATH, JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  }

  async find(userName: string): Promise<User[]> {
    try {
      const data = JSON.parse(readFileSync(FILE_PATH).toString());
      const user: User[] = data.filter(
        (user: User) => user.userName === userName
      );
      return user;
    } catch (error) {
      throw error;
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return JSON.parse(readFileSync(FILE_PATH).toString());
    } catch (error) {
      throw error;
    }
  }
}
