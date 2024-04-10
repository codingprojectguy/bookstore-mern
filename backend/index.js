import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { mongoose } from "mongoose";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Bookstore");
});

app.use("/books", booksRoute);

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
