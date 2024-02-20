import express from "express";
const router = express.Router();
import {
    bookCategorySchema,
    authorSchema,
} from "../validators/bookAttribute.validator.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import BookAttributeController from "../controllers/bookAttribute.controller.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import IdValidator from "../middlewares/IdValidator.js";

// Book Attributes

router.get("/all", asyncTryCatchFn(BookAttributeController.getBookAttributes));

// Category
router.post(
    "/category",
    RequestValidator(bookCategorySchema),
    asyncTryCatchFn(BookAttributeController.addBookCategory)
);
router.get(
    "/category",
    asyncTryCatchFn(BookAttributeController.getBookCategory)
);

router.put(
    "/category/:id",
    IdValidator(),
    RequestValidator(authorSchema),
    asyncTryCatchFn(BookAttributeController.updateBookCategory)
);

// Author
router.post(
    "/author",
    RequestValidator(authorSchema),
    asyncTryCatchFn(BookAttributeController.addAuthor)
);

// router.get("/author", asyncTryCatchFn(BookAttributeController.getBookAuthor));

router.put(
    "/author/:id",
    RequestValidator(authorSchema),
    asyncTryCatchFn(BookAttributeController.updateBookAuthor)
);

export default router;
