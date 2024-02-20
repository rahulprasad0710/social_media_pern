import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { STATUS_ARRAY, PERMISSION_ARRAY } from "../constants/ServiceAction.js";
import configSetting from "../config/index.js";

const adminSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },

        mobileNumber: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: STATUS_ARRAY,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        profilePicture: {
            type: String,
        },
        jobPosition: {
            type: String,
        },
        position: {
            type: String,
            required: true,
        },
        permission: {
            type: [
                {
                    type: String,
                    enum: PERMISSION_ARRAY,
                    required: true,
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.pre("save", async function bcryptPassword(next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.matchPassword = async function checkPassword(
    enteredPassword
) {
    const isPasswordCorrect = await bcrypt.compare(
        enteredPassword,
        this.password
    );
    // console.log({
    //     isPasswordCorrect,
    //     enteredPassword,
    //     thisPassword: this.password,
    // });
    return isPasswordCorrect;
};

adminSchema.virtual("fullName").get(function createFullNameFn() {
    return `${
        this.firstName
    }${this.middleName ? this.middleName : ""}${this.lastName}`;
});

adminSchema.methods.generateAuthToken = function generateAuthTokenFn() {
    const jwtKey = configSetting.JWT_SECRET;
    return jwt.sign({ id: this._id, type: "ADMIN" }, jwtKey, {
        expiresIn: "6d",
    });
};

adminSchema.set("toObject", { virtuals: true });
adminSchema.set("toJSON", { virtuals: true });
const admin = mongoose.model("admin", adminSchema);

export default admin;
