const validator = require("validator");
const { validate } = require("../models/user");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("please Enter Name");
    } else if
        (!validator.isEmail(emailId)) {
        throw new Error("Enter valid EmailId");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please Enter Strong Password");
    }
};

module.exports = {validateSignUpData,};
