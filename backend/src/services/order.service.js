import OrderModel from "../models/order.model.js";
import OrderItemModel from "../models/orderItem.model.js";
import AppError from "../utils/AppError.js";
import customerService from "./customer.service.js";
import emailService from "./email.service.js";
import statusService from "./status.service.js";
import EmailConfig from "../config/email.config.js";
import trackingService from "./tracking.service.js";

const createOrder = async (userId, userEmail, shippingId, paymentDetails) => {
    // cart
    const cart = await customerService.getCart(userId);
    if (!cart) throw new AppError("Cart not found", 404);
    if (cart.length === 0) throw new AppError("Cart is empty", 404);

    // status
    const statusTitles = ["RECIEVED", "PENDING"];
    const statusPromises = statusTitles.map(async (title) => {
        const status = await statusService.getStatusByTitle(title);
        return status;
    });
    const [received, pending] = await Promise.all(statusPromises);
    if (!received || !pending) throw new AppError("Status not found", 404);

    // tracking details

    const trackingDetails = await trackingService.createTrackingDetails({
        statusForCustomerId: received._id,
        statusForCompanyId: received._id,
        auditById: userId,
        comment: "Order placed",
    });

    const orderItemList = cart.map((cartItem) => {
        const orderItem = {
            name: cartItem.product.name,
            qty: cartItem.quantity,
            image: cartItem.product.thumbnil._id,
            price: cartItem.product.price,
            product: cartItem.product._id,
            status: received._id,
            trackingDetails: [trackingDetails._id],
            totalOrderItemPrice: cartItem.product.price * cartItem.quantity,
            paymentStatus: pending._id,
            paymentDetails,
        };
        return orderItem;
    });

    const orderItems = await OrderItemModel.insertMany(orderItemList);
    if (!orderItems) throw new AppError("Something went wrong", 500);

    let totalOrderPrice = 0;
    let totalQuantity = 0;
    let totalProductTypes = 0;
    orderItems.map((item) => {
        totalOrderPrice += item.totalOrderItemPrice;
        totalQuantity += item.qty;
        totalProductTypes += 1;
        return true;
    });
    const order = new OrderModel({
        user: userId,
        deliveryAddress: shippingId,
        orderItems,
        totalQuantity,
        totalProductTypes,
        status: received._id,
        paymentStatus: pending._id,
        trackingDetails: [trackingDetails._id],
        totalOrderPrice,
        paymentDetails,
    });
    const savedOrder = await order.save();
    if (!savedOrder) throw new AppError("Something went wrong", 500);
    const deletedCart = await customerService.clearCart(userId);
    if (!deletedCart) throw new AppError("Something went wrong", 500);
    console.log("Order placed successfully", { userEmail });
    await emailService.sendMail(
        userEmail,
        EmailConfig.NODEMAILER_EMAIL,
        "Order Confirmation",
        "Your order has been placed successfully",
        "<h1>Your order has been placed successfully</h1>"
    );

    return savedOrder;
};

const getAllOrders = async (
    orderStatusForCompanyId,
    paymentStatusId,
    limit,
    pageIndex
) => {
    const filter = {};
    if (orderStatusForCompanyId) {
        filter.orderStatusForCompany = orderStatusForCompanyId;
    }
    if (paymentStatusId) {
        filter.paymentStatus = paymentStatusId;
    }

    const skip = (pageIndex - 1) * limit;
    const orders = await OrderModel.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("user")
        .populate("shippingAddress")
        .populate("orderItems")
        .populate("orderStatusForCustomer")
        .populate("orderStatusForCompany")
        .populate("paymentStatus");
    if (!orders) throw new AppError("Something went wrong", 500);
    return orders;
};

const getOrderByOrderId = async (orderId) => {
    const order = await OrderModel.findById(orderId)
        .populate("user")
        .populate("shippingAddress")
        .populate("orderItems")
        .populate("orderStatusForCustomer")
        .populate("orderStatusForCompany")
        .populate("paymentStatus");
    if (!order) throw new AppError("Something went wrong", 500);
    return order;
};

const getOrderByUserId = async (userId) => {
    const orders = await OrderModel.find({ user: userId })
        .populate("shippingAddress")
        .populate("orderItems")
        .populate("orderStatusForCustomer")
        .populate("orderStatusForCompany")
        .populate("paymentStatus");
    if (!orders) throw new AppError("Something went wrong", 500);
    return orders;
};

export default {
    createOrder,
    getOrderByUserId,
    getOrderByOrderId,
    getAllOrders,
};
