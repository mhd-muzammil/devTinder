const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Ghost:651RXP6TNeZpRAcd@cluster1.u0pfyeb.mongodb.net/devTinder"
    );
};

module.exports = connectDB;