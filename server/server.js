import express from "express";
import cors from "cors";

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
app.listen(5000, console.log("server running..."));
