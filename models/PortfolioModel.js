const TransactionSchema = require("./TransactionModel");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//done
let PortfolioSchema = new Schema({
  portfolioName: {
    type: String,
    required: [true, " portfolioName should be provided"],
    default: "First Portfolio",
  },
  totalCost: {
    type: Number,
    required: [false, " totalCost is optional"],
    default: 0,
  },
  transactions: {
    type: [TransactionSchema],
    default: [],
  },
});

module.exports = PortfolioSchema;
