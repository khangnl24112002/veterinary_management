import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { connectionDatabase } from "./config/connection.js";

var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  connectionDatabase();
  res.send("API is Running...");
});
app.listen(process.env.PORT, console.log("server running..."));
