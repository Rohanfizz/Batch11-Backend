exports.protect = (req, res, next) => {
    let token = req.headers["token"];

    if (!token) {
        // I dont want user to go forward
        res.status(401).json({
            status: "fail",
            message: `Unauthorized access to route`,
        });
    } else {
        next();
    }
};
