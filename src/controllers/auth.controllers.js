// ** service
import {
  currentUserService,
  loginService,
  registerService,
  sendEmailService,
} from "~/services/auth.service";

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

export const sendEmailController = async (req, res) => {
  try {
    const params = {
      Source: process.env.EMAIL_FROM, // email gửi
      Destination: {
        ToAddresses: ["tkmanh110329@gmail.com"], // email nhận
      },
      ReplyToAddresses: [process.env.EMAIL_FROM], // email trả lời
      Message: {
        Subject: {
          Data: "Test Email Subject",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: "<p>This is the <b>HTML</b> message body.</p>",
          },
        },
      },
    };
    const emailSend = await sendEmailService(params);
    return res.status(200).json({ msg: "Email sent successfully", emailSend });
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};
