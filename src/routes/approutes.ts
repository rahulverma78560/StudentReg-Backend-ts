import { Router } from "express";
import diTokens from "../constants/di-tokens";
import { injectable, inject } from "inversify";
import { AuthControllerContract } from "../controller/auth-controller.contract";
import { verifyToken } from "../middlewares/jwt-middleware";
import { StudentRegControllerContract } from "../controller/studentReg-controller.contract";
import "reflect-metadata";

const STUDENT_REG_BASE_URL = process.env.STUDENT_REG_BASE_URL || "/api";

@injectable()
export class AppRoutes {
  constructor(
    @inject(diTokens.STUDENT_REG_CONTROLLER)
    private studentRegController: StudentRegControllerContract,
    @inject(diTokens.AUTH_CONTROLLER_TOKEN)
    private authController: AuthControllerContract
  ) {}

  registerRoutes(): Router {
    const routerMiddleware = Router();

    routerMiddleware.post(
      `${STUDENT_REG_BASE_URL}/register`,
      this.authController.registerAction
    );
    routerMiddleware.post(
      `${STUDENT_REG_BASE_URL}/login`,
      this.authController.loginAction
    );

    routerMiddleware.get(
      `${STUDENT_REG_BASE_URL}/getStudentsList`,
      verifyToken,
      this.studentRegController.getAllAction
    );

    routerMiddleware.post(
      `${STUDENT_REG_BASE_URL}/regStudent`,
      verifyToken,
      this.studentRegController.postAction
    );

    routerMiddleware.delete(
      `${STUDENT_REG_BASE_URL}/deleteStudent/:studId`,
      verifyToken,
      this.studentRegController.deleteAction
    );

    return routerMiddleware;
  }
}
