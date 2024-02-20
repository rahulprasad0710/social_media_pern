import statusService from "../services/status.service.js";
import AppError from "../utils/AppError.js";

const getAllStatuses = async (req, res) => {
    const { statusType } = req.query;
    const statuses = await statusService.getAllStatuses(statusType);
    if (!statuses) throw new AppError("Something Went Wrong", 500);
    res.status(200).json({
        status: "success",
        data: statuses,
        message: "Statuses fetched successfully",
    });
};

const getStatusById = async (req, res) => {
    const { id } = req.params;
    const status = await statusService.getStatusById(id);
    if (!status) throw new AppError("Status Not Found with this id.", 404);
    res.status(200).json({
        status: "success",
        data: status,
        message: "Status fetched successfully",
    });
};

const getStatusByTitle = async (req, res) => {
    const { title } = req.params;
    const status = await statusService.getStatusByTitle(title);
    if (!status) throw new AppError("Status Not Found with this title.", 404);
    res.status(200).json({
        status: "success",
        data: status,
        message: "Status fetched successfully",
    });
};

const addStatus = async (req, res) => {
    const { title, backgroundColorClass, textColorClass, statusType } =
        req.body;
    const newStatus = await statusService.addStatus(
        title,
        backgroundColorClass,
        textColorClass,
        statusType
    );
    if (!newStatus) throw new AppError("Something went wrong", 500);
    res.status(201).json({
        status: "success",
        data: newStatus,
        message: "Status added successfully",
    });
};

const updateStatus = async (req, res) => {
    const { id } = req.params;
    const { title, backgroundColorClass, textColorClass, statusType } =
        req.body;
    const updatedStatus = await statusService.updateStatus(
        id,
        title,
        backgroundColorClass,
        textColorClass,
        statusType
    );
    if (!updatedStatus) throw new AppError("Something went wrong", 500);
    res.status(200).json({
        status: "success",
        data: updatedStatus,
        message: "Status updated successfully",
    });
};

const deleteStatus = async (req, res) => {
    const { id } = req.params;
    const deletedStatus = await statusService.deleteStatusById(id);
    if (!deletedStatus) throw new AppError("Something went wrong", 500);
    res.status(200).json({
        status: "success",
        data: deletedStatus,
        message: "Status deleted successfully",
    });
};

const getAllStatusType = (req, res) => {
    const statusType = statusService.getAllStatusType();
    if (!statusType) throw new AppError("Something went wrong", 500);
    res.status(200).json({
        status: "success",
        data: statusType,
        message: "Status Type fetched successfully",
    });
};

export default {
    getAllStatuses,
    getStatusById,
    getStatusByTitle,
    addStatus,
    updateStatus,
    deleteStatus,
    getAllStatusType,
};
