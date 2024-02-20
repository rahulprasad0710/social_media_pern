import StatusModel from "../models/status.model.js";
import AppError from "../utils/AppError.js";
import { STATUS_FOR_LIST } from "../constants/appUtils.js";

const getAllStatuses = async (statusType) => {
    let filter = {};
    if (statusType) filter = { statusType };
    const statuses = await StatusModel.find(filter);
    if (!statuses) throw new AppError("Something Went Wrong", 500);
    return statuses;
};

const getStatusById = async (id) => {
    const Status = await StatusModel.findById(id);
    if (!Status) throw new AppError("Status Not Found with this id.", 404);
    return Status;
};

const getStatusByTitle = async (title) => {
    const Status = await StatusModel.findOne({
        title: title.trim().toUpperCase(),
    });
    if (!Status) throw new AppError("Status Not Found with this title.", 404);
    return Status;
};

const getAllStatusType = () => {
    const statusType = STATUS_FOR_LIST;
    return statusType;
};

const addStatus = async (
    title,
    backgroundColorClass,
    textColorClass,
    statusType
) => {
    const isAlreadyStatus = await StatusModel.findOne({
        title: title.trim().toUpperCase(),
        statusType,
    });
    if (isAlreadyStatus) throw new AppError("Status already exists", 400);

    const newStatus = new StatusModel({
        title: title.trim().toUpperCase(),
        backgroundColorClass,
        textColorClass,
        statusType,
    });
    const savedStatus = await newStatus.save();
    if (!savedStatus) throw new AppError("Something went wrong", 500);
    return savedStatus;
};

const updateStatus = async (
    id,
    title,
    backgroundColorClass,
    textColorClass,
    statusType
) => {
    const isAlreadyThere = await StatusModel.findOne({
        title: title.trim().toUpperCase(),
        statusType,
    });

    if (isAlreadyThere && isAlreadyThere._id.toString() !== id)
        throw new AppError("Status already exists with provided title.", 404);
    const updatedStatus = await StatusModel.findByIdAndUpdate(
        id,
        {
            title: title.trim().toUpperCase(),
            backgroundColorClass,
            textColorClass,
            statusType,
        },
        {
            new: true,
        }
    );
    if (!updatedStatus) throw new AppError("Something went wrong", 500);

    return updatedStatus;
};

const deleteStatusById = async (id) => {
    const deletedStatus = await StatusModel.findByIdAndDelete(id);

    if (!deletedStatus) throw new AppError("Something went wrong", 500);
    return deletedStatus;
};

export default {
    getAllStatuses,
    getStatusById,
    addStatus,
    updateStatus,
    deleteStatusById,
    getStatusByTitle,
    getAllStatusType,
};
