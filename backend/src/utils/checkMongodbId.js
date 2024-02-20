import Joi from "joi";
import mongoose from "mongoose";
import logger from "./logger.js";

export function isValidMongoDBId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

export async function isDocumentExists(id, model) {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;

    try {
        const response = model.findById(id);
        if (response) {
            return true;
        }
        return false;
    } catch (error) {
        logger.error(error);
        return false;
    }
}

export const checkMongodbIdFormParamsSchema = Joi.object({
    id: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid ID provided",
        })
        .required(),
});
