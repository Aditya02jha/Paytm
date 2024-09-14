const express = require("express");
const userRouter = require("./user.js");
const accountRouter = require("./account.js")
const { authmiddleware } = require("../middleware.js");
const { default: mongoose } = require("mongoose");
const User = require("../Models/userSchema.js");
const Account = require("../Models/accountsSchema.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account",accountRouter);
//route to transfer amount req{userID: , body{to , amount}};

module.exports = router;
