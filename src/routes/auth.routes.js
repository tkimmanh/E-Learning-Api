// controller
import { registerController } from "~/controllers/auth.controllers";

// ** express
import { Router } from "express";

// ** route
const routerAuth = Router();

routerAuth.post("/register", registerController);

export default routerAuth;
