const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
let Admin = require("../models/AdminModel");
const generateToken = require("../utils/generateToken");
// sign up
router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      res.status(404);
      throw new Error("Admin already exists");
    }
    const admin = await Admin.create({
      userName,
      email,
      password,
    });
    let token = generateToken(admin);
    res.cookie("adminjwt", token, { httpOnly: false });
    if (admin) {
      res.json({
        _id: admin._id,
        userName: admin.userName,
        email: admin.email,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("Admin not found");
    }
  })
);

// sign in
router.post(
  "/signin",
  asyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const admin = await Admin.findOne({ userName });
    let token = generateToken(admin);
    if (admin && (await admin.matchPassword(password))) {
      res.cookie("jwtadmin", token, { httpOnly: false });
      res.json({
        _id: admin._id,
        userName: admin.userName,
        email: admin.email,
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
  res.cookie("jwtadmin", "", { maxAge: 1 });
  res.redirect("/");
  //because it never stops we use res.end()
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
