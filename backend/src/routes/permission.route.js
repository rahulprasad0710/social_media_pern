import express from "express";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import permissionController from "../controllers/permission.controller.js";
import { PERMISSION } from "../constants/ServiceAction.js";

const router = express.Router();

router.get(
    "",
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.ADMIN_ADD),
    asyncTryCatchFn(permissionController.getAllPermissions)
);

export default router;
