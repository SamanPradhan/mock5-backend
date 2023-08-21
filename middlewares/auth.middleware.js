const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(400).send({ msg: "login first" });
  }
  const decode = jwt.verify(token, process.env.secret);
  if (decode) {
    req.body.userId = decode.userId;
    next();
  } else {
    return res.status(400).send({ msg: "login first" });
  }
};

module.exports = { auth };
