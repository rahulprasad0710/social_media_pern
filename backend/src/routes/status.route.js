import express from "express";
import statusController from "../controllers/status.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import {
    statusSchema,
    statusQuerySchema,
    statusTitleSchema,
} from "../validators/status.validator.js";

const router = express.Router();

router
    .get(
        "",
        verification.verifyAdmin,
        RequestValidator(statusQuerySchema, "query"),
        asyncTryCatchFn(statusController.getAllStatuses)
    )
    .get(
        "/types",
        verification.verifyAdmin,
        asyncTryCatchFn(statusController.getAllStatusType)
    )
    .get(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        asyncTryCatchFn(statusController.getStatusById)
    )
    .get(
        "/title/:title",
        verification.verifyAdmin,
        RequestValidator(statusTitleSchema, "params"),
        asyncTryCatchFn(statusController.getStatusByTitle)
    )
    .post(
        "/",
        verification.verifyAdmin,
        RequestValidator(statusSchema),
        asyncTryCatchFn(statusController.addStatus)
    )
    .put(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        RequestValidator(statusSchema),
        asyncTryCatchFn(statusController.updateStatus)
    )
    .delete(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        asyncTryCatchFn(statusController.deleteStatus)
    );

export default router;
