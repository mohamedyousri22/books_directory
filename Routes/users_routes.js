const User = require("../models/users_Schema");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .json({ status: "Success", length: users.length, data: users });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the email already exists
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return res.status(400).json({
        status: "Fail",
        message: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({
      status: "Success",
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({ status: "Error", message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        status: "Fail",
        message: "Invalid email or password",
      });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Fail",
        message: "Invalid email or password",
      });
    }

    // If the email and password are valid, generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h", // You can customize the expiration time
    });

    // Return the token and user information
    res.status(200).json({
      status: "Success",
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
