import express from "express";
import { PermissionEnum } from "../constants/Enums.js";
import BookController from "../controllers/book.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import { bookSchema } from "../validators/bookAttribute.validator.js";

const router = express.Router();

router.get("", asyncTryCatchFn(BookController.getAll));

router.get("/:id", asyncTryCatchFn(BookController.getById));

router.post(
    "",
    verification.verifyAdmin,
    verification.checkPermission(PermissionEnum.BOOK_CREATE),
    RequestValidator(bookSchema),
    asyncTryCatchFn(BookController.create)
);

router.put(
    "/:id",
    verification.verifyAdmin,
    verification.checkPermission(PermissionEnum.BOOK_UPDATE),
    RequestValidator(bookSchema),
    asyncTryCatchFn(BookController.update)
);

router.delete("/:id", asyncTryCatchFn(BookController.remove));

export default router;
