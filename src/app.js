const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { ReturnDocument } = require("mongodb");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const user = require("./models/user");
const { userAuth } = require("./middlewares/Auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    

    //Creating new instance of data model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });


    await user.save();
    res.send("userdata added successfully");
  } catch (err) {
    res.status(400).send("Error save the User:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("There is no User With this EmailId");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {

      const token = await user.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000), });
      res.send("Login Successfull!!!");
    } else {
      throw new Error("password is not Correct");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

 

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("sending connection Successfully");
  
  res.send(user.firstName + " Sent the Connection Request");
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });
    if (user.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//Delete a User
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("User has been successfully Deleted");
  } catch (err) {
    res.status(404).send("something went wrong");
  }
});

//Update a user

app.patch("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "gender",
      "age",
      "photoUrl",
      "skills",
      "about",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: "true",
    });
    console.log(user);

    res.send("User has been Updated Successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});
connectDB()
  .then(() => {
      console.log("Database connection established");
      app.listen(8055, () => {
        console.log("Server is successfully running on port 8055......");
      });
  })
  .catch((err) => {
    console.error("Database cannot be established");
  });



