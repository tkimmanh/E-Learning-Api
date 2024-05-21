// ** express
import express from "express";

// ** cors
import cors from "cors";

// ** config
import connect from "./config/connect";

const app = express();

connect();

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// **  route

const hostname = "localhost";
const port = 8017;

app.listen(port, hostname, () => {
  console.log(`Running ${hostname}:${port}/`);
});
