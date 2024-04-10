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

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//Route for get one book from database by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

//route for update a book
app.put("/books/:id", async (req, res) => {
  try {
    // Check if all required fields are present in the request body
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    // Extract the book ID from the request parameters
    const { id } = req.params;

    // Use Mongoose's findByIdAndUpdate to update the book
    const result = await Book.findByIdAndUpdate(id, req.body);

    // If no book was found with the provided ID, return a 404 error
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If the book was successfully updated, return a success message
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    // If an error occurs during the update process, handle it here
    // (Currently, the catch block is empty, so errors will not be properly handled)
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
