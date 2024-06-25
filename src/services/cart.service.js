import { User } from "~/models/users.model";

export const addToCartService = async (userId, courseId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  user.cart.push(courseId);
  if (user.courses.includes(courseId)) {
    throw new Error("Khóa học đã được mua");
  }
  if (user.cart.includes(courseId)) {
    throw new Error("Khóa học đã trong giỏ hàng");
  }
  await user.save();
  return user.cart;
};

export const getCartService = async (userId) => {
  const user = await User.findById(userId).populate("cart");
  if (!user) throw new Error("User not found");
  return user.cart;
};
