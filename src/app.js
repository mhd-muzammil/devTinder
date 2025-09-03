const express = require("express");

const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  

try {
    await user.save();
    res.send("userdata added successfully");
} catch (err) {
    res.status(400).send("Error save the User:" + err.message);
    }
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
    const user = await User.findByIdAndDelete({_id:userId});
    res.send("User has been successfully Deleted");
  } catch (err){
    res.status(404).send("something went wrong");
  }
});

//Update a user

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({_id:userId }, data);
    res.send("User has been Updated Successfully");
  } catch (err){
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



