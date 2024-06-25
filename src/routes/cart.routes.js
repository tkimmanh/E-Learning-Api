import { Router } from "express";
import {
  addToCartController,
  createPaymentController,
  executePaymentController,
} from "~/controllers/cart.controllers";
import { requireSignin } from "~/middlewares/require-signin";

const routerCart = Router();

routerCart.post("/add-to-cart", requireSignin, addToCartController);

export default routerCart;
