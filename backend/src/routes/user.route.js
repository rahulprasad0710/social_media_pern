import express from "express";
import userController from "../controllers/user.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import sanatizePagination from "../middlewares/sanatizePagination.js";
import { PERMISSION } from "../constants/ServiceAction.js";
import RequestValidator, {
    validateMongodbIdFromParams,
} from "../middlewares/RequestValidator.js";
import { getAllUsersSchema } from "../validators/user.validator.js";

const router = express.Router();

router.get(
    "/",
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.USER_VIEW),
    RequestValidator(getAllUsersSchema, "query"),
    sanatizePagination,
    asyncTryCatchFn(userController.getAll)
);

router.get(
    "/:id",
    verification.verifyAdmin,
    validateMongodbIdFromParams,
    verification.checkPermission(PERMISSION.USER_VIEW),
    asyncTryCatchFn(userController.getById)
);

router.put(
    "/:id",
    verification.verifyAdmin,
    verification.checkPermission(PERMISSION.USER_EDIT),
    validateMongodbIdFromParams,
    asyncTryCatchFn(userController.update)
);

export default router;
