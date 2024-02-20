import express from "express";
import verification from "../middlewares/authorization.js";
import { PERMISSION } from "../constants/ServiceAction.js";
import auditController from "../controllers/audit.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import auditQuerySchema from "../validators/audit.validator.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import sanatizePagination from "../middlewares/sanatizePagination.js";

const router = express.Router();

router.get(
    "",
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.AUDIT_VIEW),
    RequestValidator(auditQuerySchema, "query"),
    sanatizePagination,
    asyncTryCatchFn(auditController.getAll)
);

router.get("/:id", asyncTryCatchFn(auditController.getAuditById));

export default router;
