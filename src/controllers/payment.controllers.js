import {
  createPaymentService,
  executePaymentService,
} from "~/services/payment.service";

export const createPaymentController = async (req, res) => {
  try {
    const payment = await createPaymentService(req.params.courseId);
    return res.status(200).json(payment);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ msg: error.message });
  }
};

export const executePaymentController = async (req, res) => {
  try {
    const { paymentId, payerId } = req.body;
    const payment = await executePaymentService(
      paymentId,
      payerId,
      req.user._id
    );
    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
