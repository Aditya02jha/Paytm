const express = require("express");
const mongoose = require("mongoose");
const { authmiddleware } = require("../middleware");
const Account = require("../Models/accountsSchema");

const router = express.Router();
router.use(authmiddleware);

const transfer = async (from, to, amount) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log(amount);
  try {
    const from_User = await Account.findOne({ userId: from }).session(session);
    const to_User = await Account.findOne({ userId: to }).session(session);

    if (!from_User) throw new Error("Sender account not found");
    if (!to_User) throw new Error("Recipient account not found");
    if (from_User.balance < amount) throw new Error("Insufficient Balance");

    // Deduct amount from sender
    await Account.findOneAndUpdate(
      { userId: from },
      { $inc: { balance: -amount } },
      { session }
    );

    // Add amount to recipient
    await Account.findOneAndUpdate(
      { userId: to },
      { $inc: { balance: amount } },
      { session }
    );
    await session.commitTransaction();
    return { message: "Transfer Successful" };
  } catch (err) {
    await session.abortTransaction();
    throw new Error(`${err.message}`);
  } finally {
    session.endSession();
  }
};

router.post("/transfer", async (req, res) => {
  try {
    const result = await transfer(
      req.userId,
      req.body._id,
      req.body.amount
    );

    res.status(200).json({
      message: "Transaction is Successful",
      result: result,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      success: false,
      message: "Transfer Failed",
    });
  }
});

router.post("/balance", authmiddleware, async (req, res) => {
  try {
    const accountDb = await Account.findOne({ userId: req.userId });
    if (!accountDb) {
      return res.status(500).json({ message: "Account Not Found" });
    }
    res.status(200).json({ balance: accountDb.balance });
  } catch (err) {
    res.status(500).json({ message: "Error fetching balance" });
  }
});

module.exports = router;
