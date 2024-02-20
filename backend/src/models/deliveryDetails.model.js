import mongoose from "mongoose";

const deliveryDetailsSchema = new mongoose.Schema({
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true,
    },
    estimatedDeliveryDate: {
        type: Date,
    },
    courierInfo: {
        name: String,
        contactInfo: String,
        trackingNumber: String,
    },
    comment: {
        type: String,
    },
    deliveryZone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeliveryZone",
    },
    deliveryConfirmed: {
        type: Boolean,
        default: false,
    },
    deliveryConfirmedAt: {
        type: Date,
    },
    deliveryPerson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
    },
    deliveryFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
    },
    deliveryTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
    },
    deliveryAttempts: {
        type: Number,
        default: 0,
    },
    reasonForDelay: {
        type: String,
    },
    shippingPriceForCompany: {
        type: Number,
        required: true,
    },
    deliveryPrice: {
        type: Number,
        required: true,
    },
});

const deliveryDetails = mongoose.model(
    "DeliveryDetails",
    deliveryDetailsSchema
);

export default deliveryDetails;
