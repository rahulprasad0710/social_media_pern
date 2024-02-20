import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import configSetting from "../config/index.js";
import { UserStatusEnum } from "../constants/Enums.js";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: UserStatusEnum,
        },
        mobileNumber: {
            type: Number,
            required: true,
        },

        profilePicture: {
            type: String,
            default: "",
        },
        addresses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Address",
            },
        ],

        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function hashPasswordFn(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function checkPassword(
    enteredPassword
) {
    const isPasswordCorrect = await bcrypt.compare(
        enteredPassword,
        this.password
    );
    return isPasswordCorrect;
};

userSchema.methods.generateAuthToken = function generateAuthTokenFn() {
    const { _id } = this;
    return jwt.sign(
        {
            id: _id,
            type: "USER",
            isAdmin: false,
        },
        configSetting.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
};

userSchema.virtual("fullName").get(function getFullNameFn() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
