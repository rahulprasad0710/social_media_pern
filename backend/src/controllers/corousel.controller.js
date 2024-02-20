import productSettingService from "../services/product/corousel.service.js";
import fileUploadService from "../services/fileUpload.service.js";
import { SERVICES, ACTIONS, ENTITY_TYPE } from "../constants/ServiceAction.js";
import auditService from "../services/audit.service.js";

const addCorousel = async (req, res) => {
    const { title, url, status, description } = req.body;
    let image = null;

    if (req.files.length === 0)
        return res.status(400).json({
            success: false,
            message: "Please upload image",
        });

    const imageArray = await fileUploadService.uploadFile(
        req.files,
        "CAROUSEL"
    );

    if (imageArray.length > 0) {
        [image] = imageArray;
    }

    const corousel = await productSettingService.addCorousel(
        title,
        image,
        url,
        status,
        description
    );

    const { id: userId, permissionType } = req.user;
    await auditService.addAudit2(
        corousel._id,
        ENTITY_TYPE.CAROUSEL,
        userId,
        permissionType,
        SERVICES.CAROUSEL_SERVICE,
        ACTIONS.CREATED,
        `Added corousel : ${corousel.title} successfully.`
    );

    return res.status(201).json({
        success: true,
        data: corousel,
        message: "Corousel added successfully",
    });
};

const getCorousels = async (req, res) => {
    const corousels = await productSettingService.getCorousels();
    return res.status(200).json({
        success: true,
        data: corousels,
        message: "Corousels fetched successfully",
    });
};

const getCorouselById = async (req, res) => {
    const { id } = req.params;
    const corousel = await productSettingService.getCorouselById(id);
    return res.status(200).json({
        success: true,
        data: corousel,
        message: "Corousel fetched successfully",
    });
};

const updateCorousel = async (req, res) => {
    const { id } = req.params;
    const { title, url, status, description } = req.body;
    let image = null;
    if (req.files.length > 0) {
        const imageArray = await fileUploadService.uploadFile(
            req.files,
            "CAROUSEL"
        );
        [image] = imageArray;
    }
    const corousel = await productSettingService.updateCorousel(
        id,
        title,
        image,
        url,
        status,
        description
    );
    const { id: userId, permissionType } = req.user;
    await auditService.addAudit2(
        corousel._id,
        ENTITY_TYPE.CAROUSEL,
        userId,
        permissionType,
        SERVICES.CAROUSEL_SERVICE,
        ACTIONS.UPDATED,
        `Corousel Updated : ${corousel.title} successfully.`
    );

    return res.status(201).json({
        success: true,
        data: corousel,
        message: "Corousel updated successfully",
    });
};

export default {
    addCorousel,
    getCorousels,
    getCorouselById,
    updateCorousel,
};
