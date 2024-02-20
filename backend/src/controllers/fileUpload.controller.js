import fileUploadService from "../services/fileUpload.service.js";
import PAGINATION from "../constants/Pagination.js";

const getFiles = async (req, res) => {
    const {
        searchTerm,
        limit,
        pageIndex,
        relatedTo,
        startDate,
        endDate,
        fileType,
    } = req.query;

    const pagination = {
        limit: Number(limit) || PAGINATION.LIMIT,
        pageIndex: Number(pageIndex) || PAGINATION.PAGE_INDEX,
    };

    const files = await fileUploadService.getFiles(
        searchTerm,
        pagination.limit,
        pagination.pageIndex,
        relatedTo,
        startDate,
        endDate,
        fileType
    );
    res.status(200).json({
        success: true,
        data: files,
        message: "Files fetched successfully",
    });
    if (!files) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Files not fetched",
        });
    }
};

const uploadFile = async (req, res) => {
    const data = await fileUploadService.uploadFile(
        req.files,
        req.body.relatedTo
    );

    if (!data) {
        res.status(400).json({
            success: false,
            data: null,
            message: "File Not Uploaded.",
        });
    }

    return res.status(201).json({
        success: true,
        data,
        message: "file created successfully",
    });
};

const cloudUpload = async (req, res) => {
    const data = await fileUploadService.uploadImageToCloudinary(
        req.files,
        req.body.relatedTo
    );

    if (!data) {
        res.status(400).json({
            success: false,
            data: null,
            message: "File Not Uploaded.",
        });
    }

    return res.status(201).json({
        success: true,
        data,
    });
};

export default { uploadFile, getFiles, cloudUpload };
