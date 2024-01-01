const express = require("express");
const router = express.Router();
const Books_controllers = require("../controllers.js/books_controllers");
const { body, validationResult } = require("express-validator");

const validatePostData = [
  body("title").notEmpty().withMessage("Title cannot be empty"),
  body("author").notEmpty().withMessage("Author cannot be empty"),
  body("publicationDate").isISO8601().withMessage("Invalid date format"),
  // Add more validation rules as needed
];
router
  .route("/")
  .get(Books_controllers.getallBooks)
  .post(validatePostData, Books_controllers.createBook);
router
  .route("/:id")
  .get(Books_controllers.getSingleBook)
  .put(Books_controllers.updateBook)
  .delete(Books_controllers.deletebook);

module.exports = router;
