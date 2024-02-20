import categoryService from "../services/category.service.js";
import auditService from "../services/audit.service.js";
import { SERVICES, ACTIONS, ENTITY_TYPE } from "../constants/ServiceAction.js";

const getRootCategory = async (req, res, _next) => {
    const categories = await categoryService.getRootCategory();
    res.status(200).json({
        sucess: true,
        data: categories,
        message: "Get all categories successfully",
    });
};

const getAllCategories = async (req, res, _next) => {
    const { searchTerm, status, level, parentId } = req.query;
    const categories = await categoryService.getAllCategories(
        searchTerm,
        status,
        level,
        parentId
    );
    res.status(200).json({
        sucess: true,
        data: categories,
        message: "Get all categories successfully",
    });
};

const addCategory = async (req, res, _next) => {
    const { id, permissionType } = req.user;
    const { title, level, parent } = req.body;
    const category = await categoryService.addCategory(title, level, parent);

    await auditService.addAudit2(
        category._id,
        ENTITY_TYPE.CATEGORY,
        id,
        permissionType,
        SERVICES.CATEGORY_SERVICE,
        ACTIONS.CREATED,
        `Added category:title: ${category.title} , level: ${category.level} , status: ${category.status} successfully.`
    );

    res.status(201).json({
        sucess: true,
        data: category,
        message: "Category added  successfully",
    });
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { title, parent } = req.body;
    const { id: userId, permissionType } = req.user;

    const category = await categoryService.updateCategory(id, parent, title);

    await auditService.addAudit2(
        category._id,
        ENTITY_TYPE.CATEGORY,
        userId,
        permissionType,
        SERVICES.CATEGORY_SERVICE,
        ACTIONS.UPDATED,
        `Updated category ${category.title} successfully.`
    );

    res.status(201).json({
        sucess: true,
        data: category,
        message: "Update category successfully.",
    });
};

const updateCategoryStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { id: userId, permissionType } = req.user;

    const category = await categoryService.updateCategoryStatus(id, status);

    await auditService.addAudit2(
        category._id,
        ENTITY_TYPE.CATEGORY,
        userId,
        permissionType,
        SERVICES.CATEGORY_SERVICE,
        ACTIONS.UPDATED,
        `Updated category ${category.title} status to ${status}.`
    );

    res.status(201).json({
        sucess: true,
        data: category,
        message: "Update category status successfully.",
    });
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    res.status(200).json({
        sucess: true,
        data: category,
        message: "Get category by id successfully.",
    });
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const { id: userId, permissionType } = req.user;
    const category = await categoryService.deleteCategory(id);

    await auditService.addAudit2(
        category._id,
        ENTITY_TYPE.CATEGORY,
        userId,
        permissionType,
        SERVICES.CATEGORY_SERVICE,
        ACTIONS.DELETED,
        `Deleted category ${category.title} successfully.`
    );

    res.status(201).json({
        sucess: true,
        data: category,
        message: "Delete category by id successfully.",
    });
};

export default {
    getAllCategories,
    addCategory,
    updateCategory,
    getCategoryById,
    deleteCategory,
    updateCategoryStatus,
    getRootCategory,
};
