import permissionService from "../services/permission.service.js";
import { PERMISSION_ARRAY } from "../constants/ServiceAction.js";

const getAllPermissions = async (req, res) => {
    res.status(200).json({
        sucess: true,
        data: PERMISSION_ARRAY,
        message: "permissions fetched successfully",
    });

    // const permissions = await permissionService.getAllPermissions();
};

const getPermissionById = async (req, res) => {
    const { id } = req.params;
    const permission = await permissionService.getPermissionById(id);
    res.status(200).json({
        sucess: true,
        data: permission,
        message: "Permission fetched successfully",
    });
};

const addPermission = async (req, res) => {
    const { permission, description } = req.body;
    const newPermission = await permissionService.addPermission(
        permission,
        description
    );
    res.status(200).json({
        sucess: true,
        data: newPermission,
        message: "Permission added successfully",
    });
};

const updatePermission = async (req, res) => {
    const { id } = req.params;
    const { permission, description } = req.body;
    const updatedPermission = await permissionService.updatePermission(
        id,
        permission,
        description
    );
    res.status(200).json({
        sucess: true,
        data: updatedPermission,
        message: "Permission updated successfully",
    });
};

const deletePermissionById = async (req, res) => {
    const { id } = req.params;
    const deletedPermission = await permissionService.deletePermissionById(id);
    res.status(200).json({
        sucess: true,
        data: deletedPermission,
        message: "Permission deleted successfully",
    });
};

export default {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission,
    deletePermissionById,
};
