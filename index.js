const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const mongoose = require("mongoose");
const books_routes = require("./Routes/bookes_routes");
const users_routes = require("./Routes/users_routes");

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("DB Connected Successful!"))
  .catch((err) => {
    console.log(err);
  });
const Port = process.env.port || 3001;
app.listen(Port, () => {
  console.log(`server running at ${Port}`);
});

app.use("/api/books", books_routes);
app.use("/api/user", users_routes);
