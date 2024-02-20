import express from "express";
import authController from "../controllers/admin.controller.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import { loginSchema } from "../validators/admin.validator.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import adminSettingRoutes from "./adminSetting.route.js";
import verifyAdmin from "../middlewares/authorization.js";

const router = express.Router();

// @ route POST api/admin/login
// @ desc Login admin
// @ access Public

router
    .post(
        "/login",
        RequestValidator(loginSchema),
        asyncTryCatchFn(authController.login)
    )
    .route("/settings", verifyAdmin, adminSettingRoutes);

export default router;
