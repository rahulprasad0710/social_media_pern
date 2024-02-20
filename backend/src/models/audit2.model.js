import mongoose from "mongoose";
import {
    PERMISSION_ARRAY,
    ACTIONS_ARRAY,
    SERVICES_ARRAY,
    ENTITY_TYPE_ARRAY,
} from "../constants/ServiceAction.js";

const audit2Schema = new mongoose.Schema({
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    entityType: {
        type: String,
        enum: ENTITY_TYPE_ARRAY,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true,
    },
    PermissionType: {
        type: String,
        enum: PERMISSION_ARRAY,
        required: true,
    },

    serviceName: {
        type: String,
        enum: SERVICES_ARRAY,
        required: true,
    },
    action: {
        type: String,
        enum: ACTIONS_ARRAY,
        required: true,
    },
    ipAddress: { type: String },
    success: { type: Boolean },
    message: {
        type: String,
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Audit = mongoose.model("Audit2", audit2Schema);

export default Audit;
