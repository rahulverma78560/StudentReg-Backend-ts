import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { AuthControllerContract } from "./auth-controller.contract";
import "reflect-metadata";
import diTokens from "../constants/di-tokens";
import { UsersBoContract } from "../bo/users-bo.contract";
import { User } from "../models/user.model";
import generateResponse from "../utils/response-generator";

@injectable()
export class AuthController implements AuthControllerContract {
  constructor(
    @inject(diTokens.USERS_BO)
    private _userBo: UsersBoContract
  ) {}

  registerAction = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const user = <User>req.body;
      const added = await this._userBo.regUser(user);
      const response = generateResponse<User>(
        "Registered successfully",
        201,
        added
      );
      res.send(response);
    } catch (error: any) {
      const errResponse = generateResponse<null>(error.message, 400);
      res.send(errResponse);
    }
  };

  loginAction = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const user = <User>req.body;
      const token = await this._userBo.validate(user);
      const response = generateResponse<string>(
        "Authenticated successfully",
        200,
        token
      );
      res.send(response);
    } catch (error: any) {
      const errResponse = generateResponse<null>(error.message, 500);
      res.send(errResponse);
    }
  };
}
