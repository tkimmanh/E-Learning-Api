// ** service
import { loginService, registerService } from "~/services/auth.service";

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
      // secure: true, // chỉ gửi token qua https
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
