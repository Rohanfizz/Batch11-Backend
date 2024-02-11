const express = require("express");
const blogpostRouter = require("./routers/blogpostRouter");
const AppError = require("./utils/AppError");

const app = express();
app.use(express.json()); // to access body

// app.use("/user",userRouter)
app.use("/blogpost", blogpostRouter);

//unhandled routes
app.all("*", (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

//global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

module.exports = app;
