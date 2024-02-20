import Joi from "joi";
import { isValidMongoDBId } from "../utils/checkMongodbId.js";
import PRODUCT_ENUMS from "../constants/ProductEnums.js";

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().positive().required(),
    mrp: Joi.number().positive().required(),
    quantity: Joi.number().integer().positive().required(),
    featuredIn: Joi.string()
        .valid(...PRODUCT_ENUMS.PRODUCT_FEATURED_IN_ARRAY)
        .required(),
    brand: Joi.string().required(),
    thumbnilName: Joi.string(),
    category: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid category ID provided",
        })
        .required(),
});

export const productQuerySchema = Joi.object({
    searchTerm: Joi.string(),
    featuredIn: Joi.string().valid(...PRODUCT_ENUMS.PRODUCT_FEATURED_IN_ARRAY),
    categoryId: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid category ID provided",
        }),
    status: Joi.string().valid(...PRODUCT_ENUMS.PRODUCT_STATUS_ARRAY),
    pageIndex: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
});

export const productPublicQuerySchema = Joi.object({
    searchTerm: Joi.string(),
    featuredIn: Joi.string().valid(...PRODUCT_ENUMS.PRODUCT_FEATURED_IN_ARRAY),
    categoryId: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid category ID provided",
        }),
    status: Joi.string().valid(...PRODUCT_ENUMS.PUBLIC_ALLOWED_PRODUCT_STATUS),

    pageIndex: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
});

export default productSchema;
