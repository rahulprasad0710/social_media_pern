import Joi from "joi";
import { isValidMongoDBId } from "../utils/checkMongodbId.js";

export const categorySchema = Joi.object({
    title: Joi.string().required(),
    parent: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("Invalid Parent category Id");
            }
            return value;
        })
        .allow(null),
    level: Joi.number().integer().positive().required(),
});

export const categoryUpdateSchema = Joi.object({
    title: Joi.string().required(),
    parent: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("Invalid Parent category Id");
            }
            return value;
        })
        .allow(null),
});

export const categoryQueryAllSchema = Joi.object({
    // allow empty string
    searchTerm: Joi.string().allow(""),
    status: Joi.string().valid("ACTIVE", "INACTIVE"),
    level: Joi.number().integer().positive().valid(1, 2, 3),
    parentId: Joi.string().custom((value, helpers) => {
        if (!isValidMongoDBId(value)) {
            return helpers.error("Invalid Parent category Id");
        }
        return value;
    }),
});
