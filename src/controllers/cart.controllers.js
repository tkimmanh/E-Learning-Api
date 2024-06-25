import {
  addToCartService,
  createPaymentService,
  executePaymentService,
} from "~/services/cart.service";

export const addToCartController = async (req, res) => {
  try {
    const { courseId } = req.body;
    const result = await addToCartService(req.user._id, courseId);
    return res.status(200).json({ msg: "Course added to cart", result });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getCartController = async (req, res) => {
  try {
    const cart = await getCartService(req.user._id);
    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
