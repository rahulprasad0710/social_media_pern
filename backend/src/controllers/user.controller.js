import userService from "../services/user.service.js";
import AppError from "../utils/AppError.js";
import auditService from "../services/audit.service.js";
import { SERVICES, ACTIONS, ENTITY_TYPE } from "../constants/ServiceAction.js";

const getAll = async (req, res) => {
    const { limit, pageIndex } = req.pagination;
    const { searchTerm, mobileNumber, status } = req.query;

    const { users, pagination } = await userService.getAll(
        searchTerm,
        mobileNumber,
        status,
        limit,
        pageIndex
    );
    res.status(200).json({
        success: true,
        data: users,
        pagination,
        message: "Users fetched successfully",
    });
    if (!users) {
        res.status(400).json({
            success: false,
            data: null,
            pagination: null,
            message: "Users not fetched",
        });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    if (req.user.id !== id)
        throw new AppError(
            "You are not authorized to perform this action",
            401
        );
    const user = await userService.getById(id);
    res.status(200).json({
        success: true,
        data: user,
        message: "User fetched successfully",
    });
    if (!user) {
        res.status(400).json({
            success: false,
            message: "User not fetched",
        });
    }
};

const update = async (req, res) => {
    const { id: userId, permissionType } = req.user;

    const user = await userService.update(userId, req.body);
    if (!user) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "User not updated",
        });
    }

    await auditService.addAudit2(
        user._id,
        ENTITY_TYPE.USERS,
        userId,
        permissionType,
        SERVICES.USER_SERVICE,
        ACTIONS.UPDATED,
        `updated user with name ${user.name} and mobile NUmber : ${user.mobileNumber} status: ${user.status} successfully.`
    );

    return res.status(200).json({
        success: true,
        data: user,
        message: "User updated successfully",
    });
};

const updateStatus = async (req, res) => {
    const { id: userId, permissionType } = req.user;
    const { id } = req.params;
    const { status, remarks } = req.body;
    const user = await userService.updateStatus(id, status);
    if (!user) {
        return res.status(400).json({
            success: false,
            data: null,
            message: "User not updated",
        });
    }

    await auditService.addAudit2(
        user._id,
        ENTITY_TYPE.USERS,
        userId,
        permissionType,
        SERVICES.USER_SERVICE,
        ACTIONS.UPDATED,
        `updated user with name ${user.email} for ${remarks} status: ${user.status} successfully.`
    );

    return res.status(200).json({
        success: true,
        data: user,
        message: "User updated successfully",
    });
};

export default { getAll, getById, update, updateStatus };
