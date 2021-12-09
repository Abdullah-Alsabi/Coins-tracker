const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//complete it

let TransactionSchema = new Schema({
  transactionName: {
    type: String,
    unique: true,
    required: [true, " Username should be provided"],
  },
});

module.exports = TransactionSchema;
