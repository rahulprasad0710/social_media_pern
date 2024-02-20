import express from "express";
import asyncTryCatchFn from "../utils/tryCatch.js";
import permissionController from "../controllers/settings.controller.js";

const router = express.Router();

router
    .get(
        "/permissions",
        asyncTryCatchFn(permissionController.getAllPermissions)
    )
    .get("actions", asyncTryCatchFn(permissionController.getAllActions))
    .get("services", asyncTryCatchFn(permissionController.getAllServices))
    .get(
        "product-statuses",
        asyncTryCatchFn(permissionController.getAllProductStatuses)
    )
    .get(
        "product-featured-in",
        asyncTryCatchFn(permissionController.getAllProductFeaturedIn)
    );

export default router;
