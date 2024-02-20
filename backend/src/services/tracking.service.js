import TrackingDetailsModel from "../models/tracking.model.js";
import AppError from "../utils/AppError.js";

const createTrackingDetails = async (trackingDetails) => {
    const { statusForCustomerId, statusForCompanyId, auditById, comment } =
        trackingDetails;

    const newTrackingDetails = new TrackingDetailsModel({
        data: Date.now,
        statusForCustomer: statusForCustomerId,
        statusForCompany: statusForCompanyId,
        auditBy: auditById,
        comment,
    });
    const result = await newTrackingDetails.save();
    if (!result) throw new AppError("Something went wrong", 500);
    return result;
};

const getTrackingDetailsById = async (id) => {
    const response = TrackingDetailsModel.findById(id);
    if (!response) throw new AppError("Something went wrong", 500);
    return response;
};

export default {
    createTrackingDetails,
    getTrackingDetailsById,
};
