const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//complete it

let TransactionSchema = new Schema({
  coinName: {
    type: String,
    required: [true, " Username should be provided"],
    default: "Transaction",
  },
  tranType: {
    type: String,
    required: [true, "Transaction Type should be provided"],
    default: "buy",
  },
  tranAmount: {
    type: Number,
    required: [true, "Transaction amount should be provided"],
    default: 0,
  },
  tranPrice: {
    type: Number,
    required: [true, "Transaction price should be provided"],
    default: 0,
  },
});

module.exports = TransactionSchema;
