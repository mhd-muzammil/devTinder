const express = require("express");

const app = express();

app.use("/User", (req, res, next) => {
    console.log("server 1!!");
    // res.send("Response1");
    next();
},
    (req, res, next) => {
        console.log("server 2!!");
        // res.send("Response2");
        next();
    
},
    (req, res, next) => {
        console.log("server 3!!");
        res.send("Response3");
        next();
    
});



app.listen(8055, () => {
    console.log("Server is successfully running on port 7777......");
    
});
