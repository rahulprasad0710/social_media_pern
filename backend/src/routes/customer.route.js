import express from "express";
import customerController from "../controllers/customer.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import cartSchema from "../validators/customer.validator.js";

const router = express.Router();

router.get(
    "/wishlist",

    verification.verifyUser,
    asyncTryCatchFn(customerController.getWishlist)
);

router.put(
    "/wishlist/:id",
    validateMongodbIdFromParams,
    verification.verifyUser,
    asyncTryCatchFn(customerController.addToWishlist)
);

router.delete(
    "/wishlist/:id",
    validateMongodbIdFromParams,
    verification.verifyUser,
    asyncTryCatchFn(customerController.removeFromWishlist)
);

router.get(
    "/cart",
    verification.verifyUser,
    asyncTryCatchFn(customerController.getCart)
);
router.put(
    "/cart",
    verification.verifyUser,
    RequestValidator(cartSchema),
    asyncTryCatchFn(customerController.addToCart)
);

router.delete(
    "/cart/:id",
    validateMongodbIdFromParams,
    verification.verifyUser,
    asyncTryCatchFn(customerController.removeFromCart)
);

export default router;
