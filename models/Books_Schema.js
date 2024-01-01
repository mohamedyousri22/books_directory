const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
  },
  information: {
    type: String,
  },
});

const Book = mongoose.model("book", BookSchema);
module.exports = Book;
