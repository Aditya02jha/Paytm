const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const User = require("../Models/userSchema");
const { authmiddleware } = require("../middleware");
const Account = require("../Models/accountsSchema");
require("dotenv").config();
const router = express.Router();

const signUpSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

const bulkSchema = zod.object({
  filter: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  const { success } = signUpSchema.safeParse(body);

  if (!success) {
    return res.status(411).json({
      message: "Incorrect input",
    });
  }

  const user = User.findOne({ username: body.username });

  if (user._id) {
    return res.status(411).json({
      message: "username already taken",
    });
  }

  //create user in db

  const userdb = await User.create({
    username: body.username,
    firstname: body.firstname,
    lastname: body.lastname,
    password: body.password,
  });

  //create an account obj. and add some balance in account.
  const account = await Account.create({
    userId: userdb._id,
    balance: 1 + Math.random() * 1000,
  });

  const token = jwt.sign({ userId: userdb._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .json({ message: `${userdb._id} is the userId of user`, Token: token });
});

router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({
      message: "input correct creds",
    });
  }
  const userdb = await User.findOne({ username: req.body.username });
  if (!userdb) {
    return res.status(411).json({
      message: "input user id not found",
    });
  }
  if (req.body.password === userdb.password) {
    const token = await jwt.sign(
      { userId: userdb._id },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: "24h" }
    );
    console.log("token: ", token);
    return res.status(200).json({ token: token });
  }
  return res.status(411).json({
    message: "Check your password",
  });
});

// router.use(authmiddleware);

router.put("/", authmiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success)
    res.status(403).json({ message: "error while updating request" });

  await User.updateOne(req.body, { _id: req.userId });

  res.status(200).json({ message: "updated successfully" });
});

router.get("/bulk", authmiddleware, async (req, res) => {
  const { success } = bulkSchema.safeParse({
    filter: req.query.filter,
  });
  if (!success) {
    res.status(401).json({ message: "cannot get filter!" });
  }

  const userdb = await User.find({
    $or: [
      {
        firstname: {
          $regex: req.query.filter,
          $options: 'i',
        },
      },
      {
        lastname: {
          $regex: req.query.filter,
          $options: 'i',
        },
      },
    ],
  }).exec();

  //   res.status(200).json({users:[
  //     {firstname:userdb.firstname},
  //     {lastname:userdb.lastname},
  //     {_id:userdb._id}
  //   ]})

  res.status(200).json({
    users: userdb.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });

  return;
});

module.exports = router;
