const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Eneter Valid Gender");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "PhotoUrl",
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
    },
);



module.exports = mongoose.model("User",userSchema);