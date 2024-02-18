let mongoose = require("mongoose");
let validator = require("validator");
let bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: true,
    },
    userName: {
        type: String,
        unique: true,
        autoIndex: true,
        required: [true, "Please provide a userName"],
    },
    firstName: {
        type: String,
        required: [true, "Please provide a firstName"],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        autoIndex: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: "Invalid email provided",
        },
    },
    role: {
        type: String,
        enum: ["user", "elevatedUser", "admin"],
        default: "user",
        select: false,
    },
    password: {
        type: String,
        select: false,
        required: [true, "Please provide a password"],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        minlength: 8,
        validate: {
            validator: function (v) {
                return v === this.password;
            },
            message: "The passwords do not match!",
        },
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    //encypt
    this.password = await bcrypt.hash(this.password, 12);
    //passwordConfirm - undefined
    this.passwordConfirm = undefined;
    return next();
});

const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
