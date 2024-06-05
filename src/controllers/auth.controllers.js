// ** service
import {
  currentUserService,
  forgotPasswordService,
  loginService,
  registerService,
  resetPasswordService,
} from "~/services/auth.service";

import { v4 as uuidv4 } from "uuid";
import { comparePassword, hashPassword } from "~/utils/auth";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerService({ name, email, password });
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService({ email, password });
    res.cookie("token", result.token, {
      httpOnly: true,
    });
    return res.status(200).send({
      msg: "Đăng nhập thành công!",
      result,
    });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const logoutController = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).send({ msg: "Đăng xuất thành công!" });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const currentUserController = async (req, res) => {
  try {
    const result = await currentUserService(req.user._id);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;

  try {
    const short_code = uuidv4().slice(0, 6).toUpperCase();

    const params = {
      Source: process.env.EMAIL_FROM, // email gửi
      Destination: {
        ToAddresses: [email], // email nhận
      },
      ReplyToAddresses: [process.env.EMAIL_FROM], // email trả lời
      Message: {
        Subject: {
          Data: "E-Learning - Đặt lại mật khẩu",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
            <h1>Đặt lại mật khẩu</h1>
            <p>Mã xác nhận đặt lại mật khẩu của bạn là : <strong>${short_code}</strong> </p>
            <p>Mã xác nhận sẽ hết hạn sau 3 phút</p>
            `,
          },
        },
      },
    };
    const emailSend = await forgotPasswordService(email, params, short_code);

    return res.status(200).json({ msg: "Email sent successfully", emailSend });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const { new_password, short_code } = req.body;

    const result = await resetPasswordService(new_password, short_code);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
