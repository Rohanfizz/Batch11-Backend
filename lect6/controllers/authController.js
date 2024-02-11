exports.protect = (req, res, next) => {
    let token = req.headers["token"];

    if (!token) {
        // I dont want user to go forward
        restatus(UNAUTHORIZED).json({
            status: "fail",
            message: `Unauthorized access to route`,
        });
    } else {
        net();
    }
};
