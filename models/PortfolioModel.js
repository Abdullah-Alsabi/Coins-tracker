const TransactionSchema = require("./TransactionModel");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//done
let PortfolioSchema = new Schema({
  portfolioName: {
    type: String,
    required: [true, " portfolioName should be provided"],
    default: "Portfolio",
  },
  totalCost: {
    type: Number,
    required: [false, " totalCost is optional"],
    default: 0,
  },
  transactions: {
    type: [TransactionSchema],
    default: [
      {
        coinName: "bitcoin",
        tranType: "sell",
        tranAmount: 0.5,
        tranPrice: 40000,
      },
      {
        coinName: "bitcoin",
        tranType: "sell",
        tranAmount: 0.5,
        tranPrice: 40000,
      },
    ],
  },
});

module.exports = PortfolioSchema;
