import orderService from "../services/order.service.js";

const createOrder = async (req, res, next) => {
    const { shippingAddressId, paymentMethod } = req.body;
    const { id: userId, email } = req.user;
    try {
        const order = await orderService.createOrder(
            userId,
            email,
            shippingAddressId,
            paymentMethod
        );
        res.status(201).json(order);
    } catch (error) {
        next(error);
    }
};

export default {
    createOrder,
};
