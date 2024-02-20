import logger from "../utils/logger.js";
import Category from "../models/category.model.js";

const addRootCategory = async () => {
    const newCategory = new Category({
        title: "root",
        level: 0,
        children: [],
    });
    const savedCategory = await newCategory.save();
    if (!savedCategory) {
        logger.error("Error in adding root category");
    }
    return savedCategory;
};

export default addRootCategory;
