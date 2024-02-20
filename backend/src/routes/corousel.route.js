import express from "express";
import { PERMISSION } from "../constants/ServiceAction.js";
import { uploadFile } from "../middlewares/multer.js";
import corouselController from "../controllers/corousel.controller.js";
import verification from "../middlewares/authorization.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import corouselSchema from "../validators/corousel.validator.js";

const router = express.Router();

router
    .get("", asyncTryCatchFn(corouselController.getCorousels))

    // @ route GET /api/v1/product/:id

    .get(
        "/:id",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_VIEW),
        validateMongodbIdFromParams,
        asyncTryCatchFn(corouselController.getCorouselById)
    )
    .post(
        "",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_CREATE),
        uploadFile.array("file", 2),
        RequestValidator(corouselSchema),
        asyncTryCatchFn(corouselController.addCorousel)
    )
    .patch(
        "/:id",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_UPDATE),
        validateMongodbIdFromParams,
        RequestValidator(corouselSchema),
        uploadFile.array("file", 2),
        asyncTryCatchFn(corouselController.updateCorousel)
    );

export default router;
