import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileData",
    },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    trackingDetails: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TrackingDetails",
        },
    ],
    totalOrderItemPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
    },
    paymentStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Status",
        required: true,
    },
    paymentDetails: {
        type: Object,
    },
});

const orderItemModel = mongoose.model("OrderItem", orderItemSchema);

export default orderItemModel;
