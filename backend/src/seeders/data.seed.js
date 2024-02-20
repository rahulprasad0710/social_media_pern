import logger from "../utils/logger.js";
// models
import {
    BookCategory,
    BookTag,
    Author,
    Publisher,
    Course,
} from "../models/Book/Attribute.model.js";
import Language from "../models/Language.model.js";
import { Color, Size } from "../models/Products/Attributes.model.js";

// data
import {
    BOOK_TAGS,
    BOOK_CATEGORIES,
    AUTHORS,
    PUBLISHERS,
    COURSES,
    LANGUAGES,
} from "../data/Book.data.js";
import { CLOTH_SIZES, COLORS } from "../data/cloth.data.js";

const addDataToDB = async () => {
    try {
        const response = await Promise.all([
            Author.insertMany(AUTHORS),
            BookTag.insertMany(BOOK_TAGS),
            BookCategory.insertMany(BOOK_CATEGORIES),
            Publisher.insertMany(PUBLISHERS),
            Course.insertMany(COURSES),
            Language.insertMany(LANGUAGES),
            Color.insertMany(COLORS),
            Size.insertMany(CLOTH_SIZES),
        ]);

        console.log(response, "Seed Data successfully.");
        logger.info(response, "Seed Data successfully.");
    } catch (error) {
        console.log("Error in adding tag data to DB", error);
        logger.error("Error in adding tag data to DB", error);
    }
};

export default addDataToDB;
