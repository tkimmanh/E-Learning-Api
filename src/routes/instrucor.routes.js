// ** express
import { Router } from "express";

// ** controller
import { makeInstructorController } from "~/controllers/instructor.controllers";

// ** middleware
import { requireSignin } from "~/middlewares/require-signin";

const routerInstructor = Router();

routerInstructor.post(
  "/make-instrucor",
  requireSignin,
  makeInstructorController
);

export default routerInstructor;
