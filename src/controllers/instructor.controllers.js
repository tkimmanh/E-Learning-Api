import { makeInstructorService } from "~/services/instructor.service";

export const makeInstructorController = async (req, res) => {
  try {
    const { paypal_email } = req.body;
    const result = await makeInstructorService(req.user._id, paypal_email);
    return res.send(result.accountLink.url);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
