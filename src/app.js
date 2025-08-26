const express = require("express");

const app = express();

app.get("/User/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    
    res.send({ Fname: "mohamed", Lname: "Mustaqeem" });
});




app.listen(8055, () => {
    console.log("Server is successfully running on port 7777......");
    
});
