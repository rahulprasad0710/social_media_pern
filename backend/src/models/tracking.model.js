import mongoose from "mongoose";

const trackingDetailsSchema = new mongoose.Schema({
    statusForCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true,
    },
    statusForCompany: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    auditBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    },
    comment: {
        type: String,
    },
});

const trackingDetails = mongoose.model(
    "TrackingDetails",
    trackingDetailsSchema
);

export default trackingDetails;
