const express = require("express");
const router = express.Router();
let Users = require("../models/UserModel");
const TransactionSchema = require("../models/TransactionModel");

//get all tranaction for portfolio by id
router.post("/gettransactions/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  //i got the port id trough the params and user id throgh the body
  Users.findById(userId)
    .then(async (data) => {
      const getequalport = () => {
        for (let i = 0; i < data.Portfolios.length; i++) {
          const idFromDb = data.Portfolios[i]._id.toString();
          if (idFromDb === id) return data.Portfolios[i].transactions;
        }
      };
      console.log(getequalport());
      res.json(getequalport());
    })
    .catch((err) => {
      console.log(err);
    });
});

// add transaction
router.post("/addtransactions", async (req, res) => {
  console.log("iam in");
  //id is user id and the _id is the port id
  const { id, _id, coinName, tranType, tranAmount, tranPrice } = req.body;

  const data = await Users.findById(id);

  const portfolio = data.Portfolios.filter((e) => {
    return e._id.toString() === _id;
  });
  const pid = portfolio._id;
  let trans = portfolio[0].transactions;
  trans.push({
    coinName,
    tranType,
    tranAmount,
    tranPrice,
  });
  portfolio[0].transactions = trans;
  let newPorts = data.Portfolios.filter((e) => {
    if (e._id.toString() === _id) {
      e.transactions = trans;
    }
    return e;
  });
  data.portfolios = newPorts;
  data.save();
  res.json(newPorts);

  // console.log(add.Portfolios);
  // res.send("trans added");
});

router.post("/deletetransactions/:id", async (req, res) => {
  console.log("iam in");
  //userId is user id and the id is the port id and  trans_id
  const { userId, trans_id } = req.body;
  const { id } = req.params;
  const data = await Users.findById(userId);

  const portfolio = data.Portfolios.filter((e) => {
    return e._id.toString() === id;
  });

  let trans = portfolio[0].transactions;
  let newTrans = trans.filter((t) => {
    return t._id.toString() !== trans_id;
  });

  portfolio[0].transactions = newTrans;
  let newPorts = data.Portfolios.filter((e) => {
    if (e._id.toString() === id) {
      e.transactions = newTrans;
    }
    return e;
  });
  data.portfolios = newPorts;
  data.save();
  res.json(newPorts);
});

module.exports = router;
