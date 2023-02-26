import { readFileSync, writeFileSync } from "fs";
import { StudentRegDaoContract } from "./studentReg-dao.contract";
import { injectable } from "inversify";
import "reflect-metadata";
import { Student } from "../models/student.model";

const FILE_PATH = process.env.STUDENTS_FILE_PATH || "./src/db/students.json";

@injectable()
export class StudentDao implements StudentRegDaoContract<Student> {
  async write(data: Student[]): Promise<void> {
    try {
      writeFileSync(FILE_PATH, JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  }
  async read(): Promise<Student[]> {
    try {
      return JSON.parse(readFileSync(FILE_PATH).toString());
    } catch (error) {
      throw error;
    }
  }
}
