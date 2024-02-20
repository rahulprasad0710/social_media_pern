import Joi from "joi";

import { isValidMongoDBId } from "../utils/checkMongodbId.js";
// Book Schema

export const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    mrp: Joi.number().required(),
    quantity: Joi.number().integer().required(),
    thumbnil: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid thumbnail ID provided",
        }),
    category: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid category ID provided",
        }),

    author: Joi.array().items(Joi.string()),

    // TODO item should be of mongoDBobjectID
    images: Joi.array().items(Joi.string()),
    ISBN: Joi.string(),
    publisher: Joi.string().custom((value, helpers) => {
        if (!isValidMongoDBId(value)) {
            return helpers.error("Invalid Id");
        }
        return value;
    }),
    tags: Joi.array().items(Joi.string()),
    language: Joi.string().required(),
    course: Joi.string().custom((value, helpers) => {
        if (!isValidMongoDBId(value)) {
            return helpers.error("Invalid Id");
        }
        return value;
    }),

    pageCount: Joi.number().integer(),
    format: Joi.string(),
    edition: Joi.string(),
});

// book attributes
export const publisherSchema = Joi.object({
    title: Joi.string().required(),
    address: Joi.string(),
});

export const bookCategorySchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
});

export const bookTagSchema = Joi.object({
    title: Joi.string().required(),
});

export const authorSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    image: Joi.string().custom((value, helpers) => {
        if (!isValidMongoDBId(value)) {
            return helpers.error("Invalid Id");
        }
        return value;
    }),
});

export const courseSchema = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string(),
    level: Joi.string(),
    program: Joi.string(),
});
