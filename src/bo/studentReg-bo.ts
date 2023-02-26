import { StudentRegBoContract } from "./studentReg-bo.contract";
import { StudentRegDaoContract } from "../dao/studentReg-dao.contract";
import diTokens from "../constants/di-tokens";
import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Student } from "../models/student.model";

@injectable()
export class StudentRegBo implements StudentRegBoContract<any> {
  constructor(
    @inject(diTokens.STUDENT_REG_DAO)
    private dao: StudentRegDaoContract<any>
  ) {}
  async regStudent(data: Student): Promise<Student> {
    try {
      const studentList = await this.dao.read();
      studentList.push(data);
      await this.dao.write(studentList);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async deleteStudent(id: string): Promise<Student> {
    try {
      const studentList = await this.dao.read();
      const index = studentList.findIndex((stud) => stud._id === id);
      if (index !== -1) {
        const deleted = studentList.splice(index, 1)[0];
        await this.dao.write(studentList);
        return deleted;
      } else throw new Error(`The Student with id:${id} does not exist`);
    } catch (error) {
      throw error;
    }
  }

  async getStudentsList(): Promise<Student[]> {
    try {
      const studentList = await this.dao.read();
      if (studentList.length > 0) {
        return studentList;
      } else throw new Error(`No record found`);
    } catch (error) {
      throw error;
    }
  }
}
