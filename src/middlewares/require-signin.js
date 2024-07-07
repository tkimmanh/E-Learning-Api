import { expressjwt } from "express-jwt";

export const requireSignin = expressjwt({
  getToken: (req, res) => {
    // console.log("Cookies:", req.cookies);
    return req.cookies.token;
  },
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});
