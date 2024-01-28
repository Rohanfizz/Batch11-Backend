exports.getHealth = async (req, res) => {
    res.status(200).json({
        status: "success",
        data: "Server is healthy",
    });
};

exports.displayBody = async (req, res) => {
    res.status(200).json({
        status: "success",
        data: req.body,
    });
};
