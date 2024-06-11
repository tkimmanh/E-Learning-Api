// ** express
import express from "express";

// ** cors
import cors from "cors";

// ** config
import connect from "./config/connect";

// ** cookie-parser
import cookieParser from "cookie-parser";

// ** router
import routerAuth from "./routes/auth.routes";
import routerInstructor from "./routes/instrucor.routes";
import routerCourse from "./routes/course.routes";

// ** csrf
import csrf from "@dr.pogodin/csurf";

const app = express();

connect();

app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
  })
);
app.use(cookieParser());

const csrfProtection = csrf({ cookie: true });

app.use(csrfProtection);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// **  route
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.use("/auth", routerAuth);
app.use("/instructor", routerInstructor);
app.use("/course", routerCourse);

const hostname = "localhost";
const port = 8017;

app.listen(port, hostname, () => {
  console.log(`Running ${hostname}:${port}`);
});
