const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Mohamed",
        lastName: "Muzammil",
        emailId: "mhd@zamil.com",
        password: "Zam@6644",
    });
try {
    await user.save();
    res.send("userdata added successfully");
} catch (err) {
    res.status(400).send("Error save the User:" + err.message);
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



