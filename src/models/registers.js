const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
var validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already present"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  active: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  mailToken: {
    type: String,
    default: "",
  },
});

userSchema.methods.generateAuthToken = function () {
  // console.log(this._id);
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30m" }
  );
  // this.mailToken = token;
  return token;
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // this.cpassword = await bcrypt.hash(this.password,10);
    // console.log(`password is ${this.password}`);
  }
  // this.confirmpassword=undefined;
});

const UserRegistration = mongoose.model("UserRegistration", userSchema);

module.exports = UserRegistration;
