const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const {
    CREATED,
    BAD_REQUEST,
    UNAUTHORIZED,
    OK,
} = require("../utils/statusCodes");
const AppError = require("../utils/AppError");
const sendEmail = require("../utils/mail");

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

exports.loginController = catchAsync(async (req, res, next) => {
    // get the username and password from req
    const { email, password } = req.body;
    if (!email || !password) {
        return next(
            new AppError("Please provide email and password", BAD_REQUEST)
        );
    }
    // try to get the user with the provided email - SQL = Select * (+ password) from usermodel where email = email
    const user = await UserModel.findOne({ email: email }).select("+password");
    // if email does not exist - Failure case
    if (!user) {
        return next(new AppError("Invalid email or password", UNAUTHORIZED));
    }
    //Compare this raw password with hashed password from DB
    if (!user.validatePassword(password, user.password)) {
        // password did not match with hashed password from db
        return next(new AppError("Invalid email or password", UNAUTHORIZED));
    }
    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    // send JWT token back
    res.status(CREATED).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
});

//logout is handled from the client side by deleting the JWT token

exports.protect = catchAsync(async (req, res, next) => {
    //Get the token from headers
    let token = req.headers.authorization;
    // If token is not present
    if (!token) {
        return next(new AppError("You are not logged in!", UNAUTHORIZED));
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Check if I have a user with _id
    const user = await UserModel.findById(decoded.id);
    // User does not exist, user is not present
    if (!user) {
        return next(new AppError("Bad token!", UNAUTHORIZED));
    }
    const jwtIsValid = user.verifyJWT(decoded.iat);
    if (!jwtIsValid) {
        return next(
            new AppError(
                "You have reseted your password. Please login again!",
                UNAUTHORIZED
            )
        );
    }
    //Grant access
    req.user = user;
    next();
});
// client gives us email
// do we have user with that email id
//

exports.forgotPassword = catchAsync(async (req, res, next) => {
    //1 get the user email from req
    const { email } = req.body;
    //2 find that user using provided email
    const user = await UserModel.findOne({ email });
    // We were not able to find the user
    if (!user) {
        return next(new AppError("Please check your email", OK));
    }
    //3 create a passwordResetToken
    const rawResetToken = user.createPasswordResetToken(); //4 Save hashed passwordResetToken to DB
    //5 Send raw passwordResetToken to user
    const url = `localhost:8080/user/reset-password/${rawResetToken}`;
    await sendEmail({
        email: email,
        subject: "Your password Reset Token (expires in 10 mins)",
        message: `Please send a patch request to this link: ${url} along with the `,
    });
    //6 res -> Please check your email
    res.status(OK).json({
        status: "success",
        message: "Please check your email",
    });
});
