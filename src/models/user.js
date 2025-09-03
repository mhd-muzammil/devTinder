const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 35,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 35,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("EmailId is not valid:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password:" + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Eneter Valid Gender:" + value);
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://example.com/default.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter valid URL:" + value);
        }
      },
    },
    about: {
      type: String,
      default: "Tell me brief about yourself",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("User",userSchema);