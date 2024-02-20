import Audit from "../models/audit.model.js";
import Audit2 from "../models/audit2.model.js";
import AppError from "../utils/AppError.js";

const addAudit = async (userId, serviceName, action, description) => {
    const newAudit = new Audit({
        userId,
        action,
        service: serviceName,
        description,
    });
    const savedAudit = await newAudit.save();
    if (!savedAudit) {
        throw new AppError("Something Went Wrong. Audit", 500);
    }

    return savedAudit;
};

const addAudit2 = async (
    entityId,
    entityType,
    userId,
    PermissionType,
    serviceName,
    action,
    description
) => {
    const newAudit = new Audit2({
        entityId,
        entityType,
        userId,
        PermissionType,
        serviceName,
        action,
        description,
        success: true,
    });
    const savedAudit = await newAudit.save();

    return savedAudit;
};

const getAll = async (
    userId,
    serviceName,
    permissionType,
    action,
    fromDate,
    toDate,
    entityType,
    limit,
    pageIndex
) => {
    const filter = {};
    if (serviceName) {
        filter.serviceName = serviceName;
    }

    if (permissionType) {
        filter.PermissionType = permissionType;
    }

    if (action) {
        filter.action = action;
    }

    if (fromDate && toDate) {
        filter.createdAt = { $gte: fromDate, $lte: toDate };
    }

    if (entityType) {
        filter.entityType = entityType;
    }

    if (userId) {
        filter.userId = userId;
    }

    const skip = (pageIndex - 1) * limit;
    const total = await Audit2.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const audits = await Audit2.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("entityId")
        .populate({
            path: "userId",
            select: "firstName lastName email id",
        });
    return {
        data: audits,
        pagination: {
            pageIndex,
            totalPages,
            totalResults: total,
            limit,
        },
    };
};

const getAuditById = async (id) => {
    const audit = await Audit2.findById(id).populate("entityId").populate({
        path: "userId",
        select: "-password -__v -createdAt -updatedAt ",
    });
    if (!audit) {
        throw new AppError("Audit not found", 404);
    }
    return audit;
};

export default {
    addAudit,
    addAudit2,
    getAll,
    getAuditById,
};
