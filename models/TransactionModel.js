const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//complete it

let TransactionSchema = new Schema({
  transactionName: {
    type: String,
    required: [true, " Username should be provided"],
    default: "First transaction",
  },
  transactionType: {
    type: String,
    required: [true, "Transaction Type should be provided"],
    default: "buy",
  },
});

module.exports = TransactionSchema;
