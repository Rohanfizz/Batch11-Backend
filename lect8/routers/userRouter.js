const express = require("express");
const {
    signupController,
    loginController,
    forgotPassword,
} = require("../controllers/userController");
const userRouter = express.Router();

// signup   -- new account
userRouter.post("/signup", signupController);
// login    -- existing account
userRouter.post("/login", loginController);
// logout   -- ignore
userRouter.post("/forgotpassword", forgotPassword);

module.exports = userRouter;
