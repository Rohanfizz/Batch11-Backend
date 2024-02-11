const AppError = require("../utils/AppError");
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../utils/statusCodes");

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};

const handleCastErrorDB = (err) => {
    const message = `Casting faild ${err.value} -> ${err.path}`;
    return new AppError(message, BAD_REQUEST);
};

const handleValidationDB = (err) => {
    const keys = Object.keys(err.errors);
    const errorArray = keys.map((key) => {
        return `[Field : ${key}, Kind: ${err.errors[key].kind}, Provided: ${err.errors[key].valueType}]`;
    });
    const message = `Validation Failed for ${errorArray}`;
    return new AppError(message, BAD_REQUEST);
};

const handleDuplicationError = (err) => {
    const message = `Image should be unique`;
    return new AppError(message, BAD_REQUEST);
};

const sendErrProd = (err, res) => {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.name === "ValidationError") err = handleValidationDB(err);
    if (err.code == 11000) err = handleDuplicationError(err);

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        //log the error
        console.error("Error ⚠", err);
        // Programatical error
        res.status(err.statusCode).json({
            status: "error",
            message: "Something went wrong!",
        });
    }
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";

    if (process.env.NODE_ENV === "development") {
        sendErrDev(err, res);
    } else {
        sendErrProd(err, res);
    }
};

module.exports = globalErrorHandler;
