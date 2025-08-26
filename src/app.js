const express = require("express");

const app = express();

app.use("/test", (req, res) => {
    res.send("Welecome to the Dashboard");
});

app.use("/", (req, res) => {
    res.send("Hello from the server");
});

app.use("/zamil", (req, res) => {
    res.send("Hello Zamil from the server");
});







app.listen(4674, () => {
    console.log("Server is successfully running on port 7777......");
    
});
