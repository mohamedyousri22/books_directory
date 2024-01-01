const express = require("express");
const books = require("../models/Books_Schema");
const { body, validationResult } = require("express-validator");
exports.getallBooks = async (req, res) => {
  try {
    const allbooks = await books.find();
    res
      .status(200)
      .json({ status: "succsess", length: allbooks.length, data: allbooks });
  } catch (error) {
    res.status(400).json({ message: "NOT FOUND" });
  }
};
exports.getSingleBook = async (req, res) => {
  const booksID = req.params.id;
  console.log(booksID);

  try {
    const singleBook = await books.findById(booksID);

    if (!singleBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ status: "success", data: singleBook });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newBook = await books.create(req.body);
    res
      .status(201)
      .json({ message: "Course added successfully", Book: newBook });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateBook = async (req, res) => {
  const booksID = req.params.id;
  try {
    const singleBook = await books.findByIdAndUpdate(booksID, req.body, {
      new: true,
    });

    if (!singleBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res
      .status(200)
      .json({ status: "book updated successful", data: singleBook });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.deletebook = async (req, res) => {
  const booksID = req.params.id;
  try {
    const singleBook = await books.findByIdAndDelete(booksID);

    if (!singleBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ status: "book deleted successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
