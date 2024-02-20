import mongoose, { Schema } from "mongoose";

const auditSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    action: {
        type: String,
        required: true,
        enum: ["CREATED", "UPDATED", "DELETED", "READ"],
    },
    service: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Audit = mongoose.model("Audit", auditSchema);
export default Audit;
