import Category from "../models/category.model.js";
import AppError from "../utils/AppError.js";

const getAllCategories = async (searchTerm, status, level, parentId) => {
    let filter = {};
    if (status) {
        filter = { ...filter, status };
    }

    if (parentId) {
        filter = { ...filter, id: parentId };
    }
    if (level) {
        filter = { ...filter, level };
    }

    if (searchTerm) {
        filter = { ...filter, title: { $regex: searchTerm, $options: "i" } };
    }

    const categories = await Category.find(filter).populate({
        path: "children",
        populate: {
            path: "children",
        },
    });
    if (!categories) {
        throw new AppError("Category not found", 404);
    }
    return categories;
};

const getRootCategory = async () => {
    const categories = await Category.find({
        level: 1,
        status: "ACTIVE",
    }).populate({
        path: "children",
        match: { status: "ACTIVE" },

        populate: {
            path: "children",
            match: { status: "ACTIVE" },
        },
    });

    if (!categories) {
        throw new AppError("Category not found", 404);
    }
    return categories;
};

const addCategory = async (title, level, parentId) => {
    if (level === 1) {
        const category = await Category.findOne({ title: title.trim() });
        if (category) {
            throw new AppError("Category already exists.", 400);
        } else {
            const newCategory = new Category({
                title: title.trim(),
                level: Number(level),
                children: [],
            });
            const savedCategory = await newCategory.save();
            if (!savedCategory) {
                throw new AppError("Something Went Wrong. Category", 500);
            }
            return savedCategory;
        }
    }
    const parentCategory = await Category.findById(parentId).populate({
        path: "children",
    });
    if (!parentCategory) {
        throw new AppError("Parent Category not found", 404);
    }
    if (parentCategory.title === title) {
        throw new AppError(
            "Category cannot have same name as parent name.",
            400
        );
    }
    if (parentCategory.level === 3) {
        throw new AppError("Level 3 Category can not have children", 400);
    }

    if (parentCategory.level + 1 !== Number(level)) {
        throw new AppError("Level is not valid", 400);
    }

    if (parentCategory.children.length > 0) {
        // eslint-disable-next-line operator-assignment, no-plusplus
        for (let i = 0; i < parentCategory.children.length; i = i + 1) {
            const childItem = parentCategory.children[i];
            if (childItem.title === title) {
                throw new AppError(
                    `Category with title :- ${title} already exists in this parent category.`,
                    400
                );
            }
        }
    }
    const newCategory = new Category({
        title: title.trim(),
        level: Number(level),
        children: [],
    });
    const savedCategory = await newCategory.save();
    if (!savedCategory) {
        throw new AppError("Something Went Wrong. Category", 500);
    }
    parentCategory.children.push(savedCategory._id);
    const updatedParentCatg = await parentCategory.save();
    if (!updatedParentCatg) {
        throw new AppError("Something Went Wrong. Parent Category", 500);
    }
    return savedCategory;
};

const updateCategory = async (id, parentId, title) => {
    const category = await Category.findById(id);
    if (!category) {
        throw new AppError("Category not found", 404);
    }

    const parentCategory = await Category.findById(parentId).populate({
        path: "children",
    });
    if (!parentCategory) {
        throw new AppError("Parent Category not found", 404);
    }

    if (parentCategory.title === title) {
        throw new AppError(
            "Category cannot have same name as parent name.",
            400
        );
    }

    if (parentCategory.children.length > 0) {
        // eslint-disable-next-line operator-assignment, no-plusplus
        for (let i = 0; i < parentCategory.children.length; i = i + 1) {
            const childItem = parentCategory.children[i];
            if (childItem.title === title) {
                throw new AppError(
                    `Category with title :- ${title} already exists in this parent category.`,
                    400
                );
            }
        }
    }

    const updatedData = await Category.findByIdAndUpdate(
        id,
        {
            title,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    return updatedData;
};

const updateCategoryStatus = async (id, status) => {
    let updatedCategory;
    const category = await Category.findById(id).populate("children");

    if (!category) {
        throw new AppError("Category not found", 404);
    }
    if (category.status === status) {
        throw new AppError("Category status already updated", 400);
    }

    if (category.level !== 3 && status === "INACTIVE") {
        const childCategories = category.children;
        let isAnyChildActive = false;
        childCategories.forEach((childCategory) => {
            if (childCategory.status === "ACTIVE") {
                isAnyChildActive = true;
            }
        });
        if (isAnyChildActive) {
            throw new AppError(
                "Category having active child categories and cannot be deactived.",
                400
            );
        } else {
            updatedCategory = await Category.findByIdAndUpdate(id, {
                status,
            });
        }
    } else {
        updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                status,
            },
            {
                new: true,
                runValidators: true,
            }
        );
    }

    if (!updatedCategory) {
        throw new AppError(
            "Category cannot update. Something Went Wrong. ",
            500
        );
    }
    return updatedCategory;
};

const getCategoryById = async (id) => {
    const category = await Category.findById(id).populate({
        path: "children",
        populate: {
            path: "children",
        },
    });
    if (!category) {
        throw new AppError("Category not found", 404);
    }

    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findById(id).populate("children");
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    let deletedCategory;
    if (category.level === 3) {
        deletedCategory = await Category.findByIdAndDelete(id);
    } else if (category.children.length > 0) {
        throw new AppError(
            "Category has child categories and cannot be deleted.",
            400
        );
    } else {
        deletedCategory = await Category.findByIdAndDelete(id);
    }

    if (!deletedCategory) {
        throw new AppError(
            "Category cannot delete. Something Went Wrong. ",
            500
        );
    }
    return deletedCategory;
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
