import mongoose from "mongoose";

import { STATUS_FOR_LIST } from "../constants/appUtils.js";

const statusSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    backgroundColorClass: {
        type: String,
    },
    textColorClass: {
        type: String,
    },
    statusType: {
        type: String,
        required: true,
        enum: [...STATUS_FOR_LIST],
    },
});

const statusModel = mongoose.model("Status", statusSchema);

export default statusModel;
