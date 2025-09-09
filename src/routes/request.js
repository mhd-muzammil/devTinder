const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/Auth");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        console.log("sending connection Successfully");

        res.send(user.firstName + " Sent the Connection Request");
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;