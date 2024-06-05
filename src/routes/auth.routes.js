// controller
import {
  loginController,
  logoutController,
  registerController,
  currentUserController,
  forgotPasswordController,
  resetPasswordController,
} from "~/controllers/auth.controllers";
import { requireSignin } from "~/middlewares/require-signin";

// ** express
import { Router } from "express";

// ** route
const routerAuth = Router();

routerAuth.post("/register", registerController);
routerAuth.post("/login", loginController);
routerAuth.get("/logout", logoutController);
routerAuth.post("/forgot-password", forgotPasswordController);
routerAuth.post("/reset-password", resetPasswordController);
routerAuth.get("/current-user", requireSignin, currentUserController);

export default routerAuth;
