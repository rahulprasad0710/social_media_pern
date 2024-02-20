import express from "express";
import fileUploadController from "../controllers/fileUpload.controller.js";
import { uploadFile } from "../middlewares/multer.js";
import verification from "../middlewares/authorization.js";
import asyncTryCatchFn from "../utils/tryCatch.js";
import { PermissionEnum } from "../constants/Enums.js";

const router = express.Router();

// @ route GET /api/v1/file-upload
// @ desc Get all files
// @ access Private

router.get(
    "",
    verification.verifyAdmin,
    asyncTryCatchFn(fileUploadController.getFiles)
);

// @ route POST /api/v1/file-upload
// @ desc Upload file
// @ access Private

router.post(
    "",
    uploadFile.array("file", 10),
    asyncTryCatchFn(fileUploadController.uploadFile)
);

// @ route POST /api/v1/file-upload/cloud

router.post(
    "/cloud",
    verification.verifyAdmin,
    verification.checkPermission(PermissionEnum.IMAGE_UPLOAD),
    uploadFile.array("file", 10),
    asyncTryCatchFn(fileUploadController.cloudUpload)
);

export default router;
