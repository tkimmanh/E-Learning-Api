// ** models
import { Course } from "~/models/course.model";
import { User } from "~/models/users.model";

// ** libs
import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", // môi trường test
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

export const createPaymentService = async (courseId) => {
  const course = await Course.findById(courseId);
  if (!course) throw new Error("Course not found");

  const discountedPriceVND = course.discount
    ? course.price - course.price * (course.discount / 100)
    : course.price;
  const discountedPriceUSD = (discountedPriceVND / 23000).toFixed(2); // 23000 là tỉ giá VND sang USD

  const items = [
    {
      name: course.name,
      sku: course._id.toString(),
      price: discountedPriceUSD,
      currency: "USD",
      quantity: 1,
    },
  ];

  const totalAmount = discountedPriceUSD;

  const create_payment_json = {
    intent: "sale",
    payer: { payment_method: "paypal" },
    redirect_urls: {
      return_url: `${process.env.FRONT_END_URL}/success`,
      cancel_url: `${process.env.FRONT_END_URL}/error`,
    },
    transactions: [
      {
        item_list: { items },
        amount: {
          currency: "USD",
          total: totalAmount,
        },
        description: "Thanh toán khóa học",
      },
    ],
  };
  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) reject(error);
      else resolve(payment);
    });
  });
};

// hàm thực thi thanh toán
export const executePaymentService = async (paymentId, payerId, userId) => {
  const execute_payment_json = { payer_id: payerId }; // thông tin người thanh toán
  return new Promise((resolve, reject) => {
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      async (error, payment) => {
        if (error) reject(error);
        else {
          const user = await User.findById(userId);
          const courseId = payment.transactions[0].item_list.items[0].sku; // lấy id khóa học
          if (user.courses.includes(courseId)) {
            return reject("Bạn đã mua khóa học này rồi");
          }

          user.courses.push(courseId); // thêm khóa học vào danh sách khóa học của người dng
          user.cart = user.cart.filter((id) => id.toString() !== courseId); // xóa khóa học khỏi giỏ hàng
          await user.save(); // lưu thông tin người dùng và đb
          resolve(payment);
        }
      }
    );
  });
};
