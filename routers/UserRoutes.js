const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
// sign up
router.post("/signup", async (req, res) => {
  let { userName, email, password } = req.body;
  const userExists = await Users.findOne({ email });
  const checkUserName = await Users.findOne({ userName });

  if (userExists || checkUserName) {
    console.log("i am in and the are exists");
    res.status(404);
    res.send("User email or Username is already exists or email is invalid");
  } else {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const user = await Users.create({
      userName,
      email,
      password,
    });
    console.log(user);
    let token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: false });
    if (user) {
      res.json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: token,
      });
    }
  }
});

// sign in
router.post("/signin", async (req, res) => {
  const { userName, password } = req.body;
  const user = await Users.findOne({ userName });
  if (!user || !(await user.matchPassword(password))) {
    console.log("i am in and the are exists");
    res.status(404).send("wrong username or password");
  } else if (user && (await user.matchPassword(password))) {
    let token = generateToken(user);
    res.cookie("jwt", token, { httpOnly: false });
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      token: token,
    });
  }
});

//sign out
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
  //because it never stops we use res.end()
  res.end();
});

//update user
router.put("/updateuser/:id", (req, res) => {
  Users.findById(req.params.id).then(async (user) => {
    // let newEmail = req.body.email;
    // let userName = req.body.userName;
    const salt = await bcrypt.genSalt(10);
    // if (userName != undefined) {
    //   const checkUserName = await Users.findOne({ userName });
    //   if (checkUserName) {
    //     res.status(404).send("The username already in use");
    //   } else user.userName = userName;
    // }
    // if (newEmail != undefined) {
    //   const userExists = await Users.findOne({ newEmail });
    //   if (userExists) {
    //     res.status(404).send("The email already in use");
    //   } else user.email = newEmail;
    // }
    if (req.body.currentPassword != undefined) {
      if (user && (await user.matchPassword(req.body.currentPassword))) {
        if (req.body.newPassword != undefined)
          req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
        user.password = req.body.newPassword;
      }
    }
    user
      .save()
      .then((data) => res.json(data))
      .catch((err) => {
        if (err) throw err;
      });
  });
});

router.get("/getuser/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// *************************

// for admin
router.get("/getusers", (req, res) => {
  Users.find()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//for admin
router.delete("/deleteuser/:id", (req, res) => {
  console.log(req.params.id);
  Users.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update from admin user will use the same for user

module.exports = router;
