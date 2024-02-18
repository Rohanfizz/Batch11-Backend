const mongoose = require("mongoose");

exports.essentialSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
})
