import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { mongoose } from "mongoose";

const app = express();

app.get("/", (req, res) => {
  console.log("Hello World!");
  return res.status(234).send("Welcome to MERN Stack Bookstore");
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("app connect to the database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
