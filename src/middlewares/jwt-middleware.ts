import { NextFunction, Request, Response } from "express";
import generateResponse from "../utils/response-generator";
import { sign, verify } from "jsonwebtoken";
import { User } from "../models/user.model";
import { config } from "dotenv";

config();
const SECRET_KEY = process.env.SECRET_KEY || "rahulverma";
const EXPIRES_IN = process.env.EXPIRES_IN || 3000000;

type PayloadType = {
  userName: string;
};

export const createToken = (user: User): string => {
  let payloadData: PayloadType = { userName: user.username };
  const payload = payloadData;
  const token = sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: string = "";
  try {
    if (!req.headers.authorization) {
      response = generateResponse<string>("No authorization header", 401);
      return res.send(response);
    } else {
      let token = req.headers.authorization.split(" ")[1];
      if (token === "null" || !token) {
        response = generateResponse<string>("No token found", 401);
        return res.send(response);
      } else {
        try {
          let payload = verify(token, SECRET_KEY) as PayloadType;
          if (!payload) {
            response = generateResponse<string>(
              "No payload found:unauthorized request",
              401
            );
            return res.send(response);
          }
        } catch (err) {
          response = generateResponse<string>("Invalid token", 401);
          return res.send(response);
        }
      }
    }
  } catch (error: any) {
    console.log(error);
    response = generateResponse<string>(error.message, 401);
    return res.send(response);
  }
  next();
};
