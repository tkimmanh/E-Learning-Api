// controller
import {
  loginController,
  logoutController,
  registerController,
} from "~/controllers/auth.controllers";

// ** express
import { Router } from "express";

// ** route
const routerAuth = Router();

routerAuth.post("/register", registerController);
routerAuth.post("/login", loginController);
routerAuth.get("/logout", logoutController);

export default routerAuth;
