const express = require("express");
const { signupController } = require("../controllers/userController");
const userRouter = express.Router();

// signup   -- new account
userRouter.post("/signup", signupController);
// login    -- existing account
// logout   -- ignore

module.exports = userRouter;
