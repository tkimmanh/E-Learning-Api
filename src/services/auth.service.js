import { User } from "~/models/users.model";
import { hashPassword } from "~/utils/auth";

export const registerService = async ({ name, email, password }) => {
  // validation
  if (!name) throw new Error("Tên không được để trống!");
  if (!password || password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự!");
  }
  // email exist
  const user = await User.findOne({ email }).exec();
  if (user) throw new Error("Người dùng đã tồn tại!");

  // hash password
  const hashedPassword = await hashPassword(password);
  // register
  await User.create({ name, email, password: hashedPassword });

  return {
    msg: "Đăng ký thành công có thể đăng nhập ngay!",
    ok: true,
  };
};
