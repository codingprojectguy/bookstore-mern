import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import { mongoose } from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to MERN Stack Bookstore");
});

//Route for save a new book

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Sned all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route for get all books form database

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
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
