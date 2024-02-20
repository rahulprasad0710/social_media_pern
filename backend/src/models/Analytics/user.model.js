import mongoose from "mongoose";
import { UserActionEnum } from "../../constants/Enums.js";

const userActionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    actionAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    actionType: {
        type: String,
        required: true,
        enum: UserActionEnum,
    },
    userAgent: {
        type: String,
    },
    ipAddress: {
        type: String,
    },
    referer: {
        type: String,
    },
});

const UserAction = mongoose.model("UserAction", userActionSchema);

export default UserAction;
