import express from "express";
import authController from "../controllers/auth.controller.js";
import RequestValidator from "../middlewares/RequestValidator.js";
import { signupSchema, loginSchema } from "../validators/user.validator.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import verification from "../middlewares/authorization.js";

const router = express.Router();

router.post(
    "/signup",
    RequestValidator(signupSchema),
    asyncTryCatchFn(authController.signup)
);

// @ route GET api/auth/verify
// @ desc Verify user
// @ access Public
router.get(
    "/me",
    verification.verifyToken,
    asyncTryCatchFn(authController.verifyUser)
);

router.post(
    "/login",
    RequestValidator(loginSchema),
    asyncTryCatchFn(authController.login)
);

export default router;
