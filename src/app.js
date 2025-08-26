const express = require("express");

const app = express();

app.get("/User", (req, res) => {
    res.send({ Fname: "mohamed", Lname: "Mustaqeem" });
});

app.post("/User", (req, res) => {
    // console.log("save data to the database");
    res.send("Data successfully saved in a database!!");
})

app.delete("/User", (req, res) => {
    res.send("Deleted Successfully")
});


app.use("/User", (req, res) => {
    res.send("Welecome to the Dashboard");
});


app.listen(8055, () => {
    console.log("Server is successfully running on port 7777......");
    
});
