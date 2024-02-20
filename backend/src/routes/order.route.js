import express from "express";
import orderController from "../controllers/order.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import orderSchema from "../validators/order.validator.js";

const router = express.Router();

router.post(
    "",
    verification.verifyUser,
    RequestValidator(orderSchema),
    asyncTryCatchFn(orderController.createOrder)
);

export default router;
