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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {

      //Create JWT Token

      const token = await jwt.sign({ _id: user._id }, "DEV@ZAMIL$786", { expiresIn: "7d" });
      
      //Add the token to the cookie and send the response back to the user

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



