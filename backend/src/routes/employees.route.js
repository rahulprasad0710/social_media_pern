import express from "express";
import employeesController from "../controllers/employees.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import { PERMISSION } from "../constants/ServiceAction.js";
import {
    adminSchema,
    updateAdminSchema,
} from "../validators/admin.validator.js";

const router = express.Router();

// @ route POST api/admin/add
// @ desc Add new admin
// @ access Private

router.post(
    "",
    RequestValidator(adminSchema),
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.ADMIN_ADD),
    asyncTryCatchFn(employeesController.addEmployee)
);

router.put(
    "/:id",
    RequestValidator(updateAdminSchema),
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.ADMIN_UPDATE),
    asyncTryCatchFn(employeesController.updateEmployee)
);

router.get(
    "",
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.ADMIN_VIEW),
    asyncTryCatchFn(employeesController.getEmployeeList)
);

router.get(
    "/:id",
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.ADMIN_VIEW),
    asyncTryCatchFn(employeesController.getEmployeeById)
);

export default router;
