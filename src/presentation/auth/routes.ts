import { Router } from "express";
import { AuthController } from "./controller";
import { MongoDatasourceImpl, MongoRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new MongoDatasourceImpl();
    const authRepositoryI = new MongoRepositoryImpl(datasourceI);
    const controller = new AuthController(authRepositoryI);

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/", AuthMiddleware.validateJWT, controller.getUsers);

    return router;
  }
}
