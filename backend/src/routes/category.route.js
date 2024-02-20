import express from "express";
import { PERMISSION } from "../constants/ServiceAction.js";
import categoryController from "../controllers/category.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import {
    categorySchema,
    categoryUpdateSchema,
    categoryQueryAllSchema,
} from "../validators/category.validator.js";

const router = express.Router();

router
    .get("", asyncTryCatchFn(categoryController.getRootCategory))
    .get(
        "/all",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.CATEGORY_VIEW),
        RequestValidator(categoryQueryAllSchema, "query"),
        asyncTryCatchFn(categoryController.getAllCategories)
    )
    .post(
        "",
        verification.verifyAdmin,
        verification.checkPermission(PERMISSION.CATEGORY_CREATE),
        RequestValidator(categorySchema),
        asyncTryCatchFn(categoryController.addCategory)
    )
    .get(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        verification.checkPermission(PERMISSION.CATEGORY_VIEW),
        asyncTryCatchFn(categoryController.getCategoryById)
    )
    .patch(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        RequestValidator(categoryUpdateSchema),
        verification.checkPermission(PERMISSION.CATEGORY_UPDATE),
        asyncTryCatchFn(categoryController.updateCategory)
    )
    .put(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        verification.checkPermission(PERMISSION.CATEGORY_STATUS_UPDATE),
        asyncTryCatchFn(categoryController.updateCategoryStatus)
    )
    .delete(
        "/:id",
        verification.verifyAdmin,
        validateMongodbIdFromParams,
        verification.checkPermission(PERMISSION.CATEGORY_DELETE),
        asyncTryCatchFn(categoryController.deleteCategory)
    );

export default router;
