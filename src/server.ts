import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { AppRoutes } from "./routes/approutes";
import diContainer from "./IoC/inversify.config";
import diTokens from "./constants/di-tokens";
import { AuthControllerContract } from "./controller/auth-controller.contract";
import { StudentRegControllerContract } from "./controller/studentReg-controller.contract";

config();

const PORT = process.env.PORT || 4000;

const STUDENT_REG_BASE_URL = process.env.STUDENT_REG_BASE_URL || "/api";

const app = express();
app.use(cors({ origin: "*", methods: "*", allowedHeaders: "*" }));
app.use(json());

const studentRegControllerObj = diContainer.get<StudentRegControllerContract>(
  diTokens.STUDENT_REG_CONTROLLER
);

const authControllerObj = diContainer.get<AuthControllerContract>(
  diTokens.AUTH_CONTROLLER_TOKEN
);

const appRoutes = new AppRoutes(studentRegControllerObj, authControllerObj);
app.use(appRoutes.registerRoutes());

app.listen(PORT, () => {
  console.log(
    `Student Registration server is running at http://localhost:${PORT}${STUDENT_REG_BASE_URL}`
  );
});
