import {
    PERMISSION_ARRAY,
    ACTIONS_ARRAY,
    SERVICES_ARRAY,
} from "../constants/ServiceAction.js";
import PRODUCT_ENUMS from "../constants/ProductEnums.js";

const getAllPermissions = async (req, res) => {
    res.status(200).json({
        sucess: true,
        data: PERMISSION_ARRAY,
        message: "All permissions fetched successfully",
    });
};

const getAllActions = async (req, res) => {
    res.status(200).json({
        sucess: true,
        data: ACTIONS_ARRAY,
        message: "All actions fetched successfully",
    });
};

const getAllServices = async (req, res) => {
    res.status(200).json({
        sucess: true,
        data: SERVICES_ARRAY,
        message: "All Services fetched successfully",
    });
};

const getAllProductStatuses = async (req, res) => {
    res.status(200).json({
        sucess: true,
        data: PRODUCT_ENUMS.PRODUCT_STATUS_ARRAY,
        message: "All Services fetched successfully",
    });
};

const getAllProductFeaturedIn = async (req, res) => {
    res.status(200).json({
        sucess: true,
        data: PRODUCT_ENUMS.PRODUCT_FEATURED_IN_ARRAY,
        message: "All Services fetched successfully",
    });
};

export default {
    getAllPermissions,
    getAllActions,
    getAllServices,
    getAllProductStatuses,
    getAllProductFeaturedIn,
};
