const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const { User } = require("../model/user.model");
require("dotenv").config();
userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(400).send({ Error: err.message });
      }
      console.log(hash);
      const newUser = new User({ email: email, password: hash });
      await newUser.save();
      res.status(200).send({ msg: "New User Created" });
    });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).send({ Error: "Email not found" });
    }
    bcrypt.compare(password, findUser.password, async (err, result) => {
      if (err) {
        return res.status(400).send({ Error: err.message });
      }
      const token = jwt.sign({ userId: findUser._id }, process.env.secret, {
        expiresIn: "1w",
      });

      return res.status(200).send({ msg: "Login Successfull", token: token });
    });
  } catch (error) {
    res.status(400).send({ Error: error.message });
  }
});
module.exports = { userRouter };
