// controller
import {
  loginController,
  logoutController,
  registerController,
  currentUserController,
  sendEmailController,
} from "~/controllers/auth.controllers";
import { requireSignin } from "~/middlewares/require-signin";

// ** express
import { Router } from "express";

// ** route
const routerAuth = Router();

routerAuth.post("/register", registerController);
routerAuth.post("/login", loginController);
routerAuth.get("/logout", logoutController);
routerAuth.get("/send-email", sendEmailController);
routerAuth.get("/current-user", requireSignin, currentUserController);

export default routerAuth;
