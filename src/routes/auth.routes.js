// controller
import {
  loginController,
  registerController,
} from "~/controllers/auth.controllers";

// ** express
import { Router } from "express";

// ** route
const routerAuth = Router();

routerAuth.post("/register", registerController);
routerAuth.post("/login", loginController);

export default routerAuth;
