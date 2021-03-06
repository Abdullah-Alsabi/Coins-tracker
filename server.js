const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const usersRouter = require("./routers/UserRoutes");
const portfolioRouter = require("./routers/PortfolioRoutes");
const TransactionRoutes = require("./routers/TransactionRoutes");
const AdminRoutes = require("./routers/AdminRoutes");
require("dotenv").config();
// Mongoose Here
const uri = process.env.ATLAS_URI;

// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(
  process.env.ATLAS_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// msg when connect

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// connect frontend
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/portfolio", portfolioRouter);
app.use("/transactions", TransactionRoutes);
app.use("/admin", AdminRoutes);

// app.use(notFound);
app.use(errorHandler);
// app.use("/authors", authorsRouter);

app.use(express.static("frontend/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend/build/index.html"));
});

// if (process.env.NODE_ENV == "production") {
//   app.use(express.static("frontend/build"));
// }
app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});
