const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { CREATED } = require("../utils/statusCodes");

exports.signupController = catchAsync(async (req, res, next) => {
    const { userName, firstName, email, lastName, password, passwordConfirm } =
        req.body;
    const newUser = await UserModel.create({
        userName,
        firstName,
        email,
        lastName,
        password,
        passwordConfirm,
    });

    newUser.password = undefined;
    newUser.role = undefined;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(CREATED).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});