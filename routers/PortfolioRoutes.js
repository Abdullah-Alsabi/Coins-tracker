const express = require("express");
const router = express.Router();
let Users = require("../models/UserModel");
const PortfolioSchema = require("../models/PortfolioModel");

//get all portfolios for user
router.get("/getportfolios/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then((data) => {
      res.json(data.Portfolios);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get spcifec portfolio for user
//check
router.post("/getportfolio/:id", (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  //i got the port id trough the params and user id throgh the body
  Users.findById(userId)
    .then(async (data) => {
      const getequalport = () => {
        for (let i = 0; i < data.Portfolios.length; i++) {
          const idFromDb = data.Portfolios[i]._id.toString();
          if (idFromDb === id) return data.Portfolios[i];
        }
      };
      console.log(getequalport());
      res.json(getequalport());
    })
    .catch((err) => {
      console.log(err);
    });
});

// add portfolio
router.post("/addportfolio", async (req, res) => {
  const { id, portfolioName, totalCost } = req.body;
  const add = await Users.findByIdAndUpdate(id, {
    $push: {
      Portfolios: {
        portfolioName: portfolioName,
        totalCost: totalCost,
      },
    },
  });
  res.send("added");
});

// router.put("/updateportfolio/:id", (req, res) => {
//   Users.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
//     if (err) console.log(err);
//     res.json("Portfiolio updated!");
//   });
// });

// router.delete("/deleteportfolio/:id", (req, res) => {
//   Users
//     .findByIdAndUpdate(req.params.id)
//     .then((data) => {
//       data.portfolios
//         .find()
//         .then((data) => {
//           res.json(data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = router;
