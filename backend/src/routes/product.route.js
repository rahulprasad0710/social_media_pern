import express from "express";
import { PERMISSION } from "../constants/ServiceAction.js";
import { uploadFile } from "../middlewares/multer.js";
import productController from "../controllers/product.controller.js";
import verification from "../middlewares/authorization.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import productSchema, {
    productQuerySchema,
    productPublicQuerySchema,
} from "../validators/product.validator.js";
import sanitizePagination from "../middlewares/sanatizePagination.js";

const router = express.Router();

// @ route POST /api/v1/product

router

    .get(
        "/p",
        RequestValidator(productPublicQuerySchema, "query"),
        sanitizePagination,
        asyncTryCatchFn(productController.getAllPublicProducts)
    )
    .get("/p/:slug", asyncTryCatchFn(productController.getProductBySlug))
    .get(
        "",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_VIEW),
        RequestValidator(productQuerySchema, "query"),
        sanitizePagination,
        asyncTryCatchFn(productController.getAllProducts)
    )
    .get(
        "/:id",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_VIEW),
        validateMongodbIdFromParams,
        asyncTryCatchFn(productController.getProductById)
    )
    .post(
        "",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_CREATE),
        uploadFile.array("file", 5),
        RequestValidator(productSchema),
        asyncTryCatchFn(productController.addProduct)
    )
    .patch(
        "/:id",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_UPDATE),
        validateMongodbIdFromParams,
        RequestValidator(productSchema),
        uploadFile.array("file", 5),
        asyncTryCatchFn(productController.updateProduct)
    )
    .put(
        "/:id",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.PRODUCT_UPDATE),
        validateMongodbIdFromParams,
        asyncTryCatchFn(productController.updateProductStatus)
    );

export default router;
