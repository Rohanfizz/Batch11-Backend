let mongoose = require("mongoose");
let validator = require("validator");
let bcrypt = require("bcryptjs");
let crypto = require("crypto");
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
    passwordChangedAt: {
        type: Date,
        default: Date.now(),
        selected: false,
    },
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    //encypt
    this.password = await bcrypt.hash(this.password, 12);
    //passwordConfirm - undefined
    this.passwordConfirm = undefined;
    return next();
});

userSchema.methods.validatePassword = async function (
    rawPassword,
    hashedPassword
) {
    return await bcrypt.compare(rawPassword, hashedPassword);
};
userSchema.methods.verifyJWT = function (JWTIssuedAtTimeStamp) {
    const passwordChangedAt = this.passwordChangedAt.getTime() / 1000;
    return passwordChangedAt < JWTIssuedAtTimeStamp;
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    //hashed value  i have to save in db
    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest(32);
    this.passwordResetTokenExpiry = Date.now() + 1000 * 60 * 10; // 1000ms * 60 = 60s * 10 = 10mins
    // return this raw token
    return resetToken;
};
const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;
