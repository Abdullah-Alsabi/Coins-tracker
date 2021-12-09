const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let Users = require("../models/UserModel");
const generateToken = require("../utils/generateToken");
// sign up
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const userExists = await Users.findOne({ email });

    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
    const user = await Users.create({
      userName,
      email,
      password,
    });
    let token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: false });
    if (user) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  })
);

// sign in
router.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const user = await Users.findOne({ userName });
    let token = generateToken(user);
    if (user && (await user.matchPassword)) {
      res.cookie("jwt", token, { httpOnly: false });
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password");
    }
  })
);

//sign out
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/"); 
  //because it never stops
  res.end();
});

//update user
// router.put("/updateuser/:id", (req, res) => {
//   Users.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
//     if (err) console.log(err);
//     res.json("Author updated!");
//   });
// });

// *************************

//for admin
// router.get("/Users", (req, res) => {
//   Users.find()
//     .then((data) => {
//       res.json(data);
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//for admin
// router.get("/Users/:id", (req, res) => {
//   Users.findById(req.params.id)
//     .then((data) => {
//       res.json(data);
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//update from admin user will use the same for user

module.exports = router;
