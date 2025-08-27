const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong");
    }
});

app.get("/getUserData", (req, res) => {
    throw new Error("ewhgkq");
    res.send("user data send");
    
});

app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).send("Something went wrong");
    }
});

app.listen(8055, () => {
    console.log("Server is successfully running on port 8055......");
    
});
