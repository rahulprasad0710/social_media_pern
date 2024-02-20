import Permission from "../models/permission.model.js";
import AppError from "../utils/AppError.js";

const getAllPermissions = async () => {
    const permissions = await Permission.find();
    if (!permissions) throw new AppError(" Something Went Wrong", 500);
    return permissions;
};

const getPermissionById = async (id) => {
    const permission = await Permission.findById(id);
    if (!permission) throw new AppError(" Something Went Wrong", 500);

    return permission;
};

const addPermission = async (permission, description) => {
    const alreadyPermssion = Permission.findOne({ permission });
    if (alreadyPermssion) throw new AppError("Permission already exists", 400);
    const slug = permission.toUpperCase().split(" ").join("_");
    const newPermission = new Permission({
        permission,
        slug,
        description,
    });
    const savedPermission = await newPermission.save();
    if (!savedPermission) throw new AppError("Something went wrong", 500);
    return savedPermission;
};

const updatePermission = async (id, permission, description) => {
    const alreadyPermssion = Permission.findOne({ permission });
    if (alreadyPermssion)
        throw new AppError(
            "Permission already exists with provided name.",
            400
        );
    const slug = permission.toUpperCase().split(" ").join("_");
    const updatedPermission = await Permission.findByIdAndUpdate(
        id,
        {
            permission,
            slug,
            description,
        },
        {
            new: true,
        }
    );
    if (!updatedPermission) throw new AppError("Something went wrong", 500);

    return updatedPermission;
};

const deletePermissionById = async (id) => {
    const deletedPermission = await Permission.findByIdAndDelete(id);
    if (!deletedPermission) throw new AppError("Something went wrong", 500);
    return deletedPermission;
};

export default {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission,
    deletePermissionById,
};
