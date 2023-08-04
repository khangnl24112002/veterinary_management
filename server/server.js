import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { connectionDatabase } from "./config/connection.js";
import { notFound } from "./middlewares/handleError.js";
const router = require("./routes/index.js");

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use("/", (req, res, next) => {
  return next(notFound("Duong dan khong hop le!"));
});
app.listen(`${process.env.PORT}`, console.log("server running..."));
