const express = require("express");
var cors = require("cors");
const blogpostRouter = require("./routers/blogpostRouter");
const AppError = require("./utils/AppError");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./utils/statusCodes");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routers/userRouter");

const app = express();
app.use(express.json()); // to access body
app.use(cors());

// app.use("/user",userRouter)
app.use("/blogpost", blogpostRouter); // localhost:PORT/blogpost
app.use("/user", userRouter); // localhost:PORT/user

//unhandled routes
app.all("*", (req, res, next) => {
    next(
        new AppError(`Cant find ${req.originalUrl} on this server!`, NOT_FOUND)
    );
});

//global error handler
app.use(globalErrorHandler);

module.exports = app;
