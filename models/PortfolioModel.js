const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//done
let PortfolioSchema = new Schema({
  portfolioName: {
    type: String,
    unique: true,
    required: [true, " portfolioName should be provided"],
  },
  totalCost: {
    type: Number,
    required: [false, " totalCost is optional"],
  },
});

module.exports = PortfolioSchema;
