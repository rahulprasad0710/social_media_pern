import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        deliveryAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OrderItem",
            },
        ],
        totalQuantity: {
            type: Number,
            required: true,
        },
        totalProductTypes: {
            type: Number,
            required: true,
        },
        totalOrderPrice: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
            required: true,
        },
        status: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Status",
        },
        trackingDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "TrackingDetails",
            },
        ],
        paymentDetails: {
            type: Object,
        },
    },
    {
        timestamps: true,
    }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
