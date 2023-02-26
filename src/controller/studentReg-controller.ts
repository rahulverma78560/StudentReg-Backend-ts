import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { StudentRegBoContract } from "../bo/studentReg-bo.contract";
import diTokens from "../constants/di-tokens";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import generateResponse from "../utils/response-generator";
import { StudentRegControllerContract } from "./studentReg-controller.contract";
import { Student } from "../models/student.model";

@injectable()
export class StudentRegController implements StudentRegControllerContract {
  constructor(
    @inject(diTokens.STUDENT_REG_BO)
    private bo: StudentRegBoContract<Student>
  ) {}
  postAction = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const studentData = <Student>req.body;
      const added = await this.bo.regStudent(studentData);
      const response = generateResponse<Student>(
        "Registered Successfully",
        201,
        added
      );
      res.send(response);
    } catch (error: any) {
      const errResponse = generateResponse<Student>(error.message, 500);
      res.send(errResponse);
    }
  };

  deleteAction = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const id = req.params.studId;
      const deleted = await this.bo.deleteStudent(id);
      const response = generateResponse<Student>(
        "Deleted Successfully",
        201,
        deleted
      );
      res.send(response);
    } catch (error: any) {
      const errResponse = generateResponse<Student>(error.message, 500);
      res.send(errResponse);
    }
  };

  getAllAction = async (
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> => {
    try {
      const Students = await this.bo.getStudentsList();
      const response = generateResponse<Student[]>(
        "Records found",
        200,
        Students
      );
      res.send(response);
    } catch (error: any) {
      const errResponse = generateResponse<Student>(error.message, 500);
      res.send(errResponse);
    }
  };
}
