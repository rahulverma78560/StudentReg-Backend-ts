import { Container } from "inversify";
import diTokens from "../constants/di-tokens";
import { StudentRegDaoContract } from "../dao/studentReg-dao.contract";
import { StudentRegBoContract } from "../bo/studentReg-bo.contract";
import { AuthControllerContract } from "../controller/auth-controller.contract";
import { AuthController } from "../controller/auth-controller";
import { UsersBo } from "../bo/users-bo";
import { UsersBoContract } from "../bo/users-bo.contract";
import { AuthDao } from "../dao/auth-dao";
import { StudentDao } from "../dao/studentReg-dao";
import { StudentRegBo } from "../bo/studentReg-bo";
import { StudentRegControllerContract } from "../controller/studentReg-controller.contract";
import { StudentRegController } from "../controller/studentReg-controller";
import { Student } from "../models/student.model";
import { AuthDaoContract } from "../dao/auth-dao.contracts";

const diContainer = new Container();

diContainer
  .bind<StudentRegControllerContract>(diTokens.STUDENT_REG_CONTROLLER)
  .to(StudentRegController);

diContainer
  .bind<AuthControllerContract>(diTokens.AUTH_CONTROLLER_TOKEN)
  .to(AuthController);

diContainer
  .bind<StudentRegDaoContract<Student>>(diTokens.STUDENT_REG_DAO)
  .to(StudentDao);

diContainer
  .bind<StudentRegBoContract<Student>>(diTokens.STUDENT_REG_BO)
  .to(StudentRegBo);

diContainer.bind<AuthDaoContract<any>>(diTokens.USERS_DAO).to(AuthDao);

diContainer.bind<UsersBoContract>(diTokens.USERS_BO).to(UsersBo);

export default diContainer;
