const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

let UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: [true, " Username should be provided and unique"],
  },
  email: {
    type: String,
    required: [true, "email should be provided and unique"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "isInvalid"],
  },
  password: {
    type: String,
    minlength: [8, "minemum password length is 8"],
    required: [true, "password should be provided"],
  },
  // Portfolio: {
  //   type: [PortfolioSchema],
  // },
});

//fire a function after doc saved to db

UserSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

//fire a function before doc saved to db

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// //static method for login user
// UserSchema.statics.login = async function (userName, password) {
//   const user = await this.findOne({ userName: userName });
//   if (user) {
//     //then next line will hash the first parameter then compare it eith the one in the db
//     //return T or F
//     const auth = await bcrypt.compare(password, user.password);
//     if (auth) {
//       return user;
//     }
//     throw Error("incorrect password");
//   }
//   throw Error("incorrect username");
// };

//first parameter is the name for the db collection
//in the portfolio and coin i should just export them just the last line
const User = mongoose.model("Users", UserSchema);
module.exports = User;
