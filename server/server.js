import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { notFound } from "./middlewares/handleError.js";
const cookieParser = require("cookie-parser");

const router = require("./routes/index.js");

var corsOptions = {
  origin: "http://localhost:3000", // Chỉnh sửa địa chỉ nguồn mà bạn muốn cho phép
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true, // Cho phép chia sẻ cookie hoặc thông tin xác thực
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use("/", (req, res, next) => {
  return next(notFound("Duong dan khong hop le!"));
});
app.listen(`${process.env.PORT}`, console.log("server running..."));
