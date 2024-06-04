// ** models
import { User } from "~/models/users.model";

// ** utils
import { comparePassword, hashPassword } from "~/utils/auth";
// ** aws
import AWS from "aws-sdk";

// ** jwt
import jwt from "jsonwebtoken";

// ** config
const SES = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// ** s3 config
const s3Config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
};

const s3 = new AWS.S3(s3Config);

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

export const loginService = async ({ email, password }) => {
  // check user
  const user = await User.findOne({ email }).exec();
  if (!user) throw new Error("Người dùng không tồn tại!");
  // check password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Mật khẩu không chính xác!");
  // token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { user, token };
};

export const currentUserService = async (userId) => {
  const user = await User.findById(userId).select("-password").exec();
  if (!user) throw new Error("Người dùng không tồn tại!");
  return { user };
};

export const sendEmailService = async (params) => {
  return SES.sendEmail(params).promise();
};
