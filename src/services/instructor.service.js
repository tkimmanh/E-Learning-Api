// ** model
import { User } from "~/models/users.model";

import paypal from "@paypal/checkout-server-sdk";

const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

export const makeInstructorService = async (user_id, paypal_email) => {
  const user = await User.findById({ _id: user_id }).exec();

  // Cập nhật email PayPal của người dng
  if (!user.email_paypal) {
    user.email_paypal = paypal_email;
    await user.save();
  }

  // Tạo link để người dng đăng k PayPal
  const accountLink = {
    url: `https://www.paypal.com/myaccount/transfer/homepage`,
    email: user.paypal_email,
  };

  return { accountLink };
};
