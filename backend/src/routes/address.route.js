import express from "express";
import addressController from "../controllers/address.controller.js";
import { PERMISSION } from "../constants/ServiceAction.js";

import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import addressSchema from "../validators/address.validator.js";

const router = express.Router();

router
    .get(
        "",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.USER_EDIT),
        asyncTryCatchFn(addressController.getAddress)
    )
    .post(
        "",
        verification.verifyUser,
        RequestValidator(addressSchema),
        asyncTryCatchFn(addressController.createAddress)
    )
    .get(
        "/me",
        verification.verifyUser,
        asyncTryCatchFn(addressController.getAddressByUserId)
    )
    .get(
        "/:id",
        validateMongodbIdFromParams,
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.USER_EDIT),
        asyncTryCatchFn(addressController.getAddressById)
    );

export default router;
