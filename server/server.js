import express from "express";
import { connectionDatabase } from "./config/connection.js";
const app = express();

app.get("/", (req, res) => {
  connectionDatabase();
  res.send("API is Running...");
});
app.listen(5000, console.log("server running..."));
