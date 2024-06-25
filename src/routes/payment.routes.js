import { Router } from "express";

// controller
import {
  createPaymentController,
  executePaymentController,
} from "~/controllers/payment.controllers";

// middleware
import { requireSignin } from "~/middlewares/require-signin";

const routerPayment = Router();

routerPayment.post(
  "/create-payment/:courseId",
  requireSignin,
  createPaymentController
);
routerPayment.post("/execute-payment", requireSignin, executePaymentController);

export default routerPayment;
