import Joi from "joi";
import { isValidMongoDBId } from "../utils/checkMongodbId.js";

const clothVariantSchema = Joi.object({
    color: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid color ID provided",
        })
        .required(),
    size: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid Size ID provided",
        })
        .required(),
    price: Joi.number().required(),
    thumbnil: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid thumbnail ID provided",
        })
        .allow(null),
    tag: Joi.array().items(Joi.string()).allow(null),
    stock: Joi.number().required(),
    images: Joi.array()
        .items(
            Joi.string()
                .custom((value, helpers) => {
                    if (!isValidMongoDBId(value)) {
                        return helpers.error("any.invalid id");
                    }
                    return value;
                })
                .messages({
                    "any.invalid id": "Invalid varient thumbnail ID provided",
                })
        )
        .allow(null),
    sold: Joi.number().allow(0),
});

const clothSchema = Joi.object({
    name: Joi.string().required(),
    brand: Joi.string().allow(null),
    variant: Joi.array().items(clothVariantSchema).required(),
    thumbnil: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid cloth thumbnail ID provided",
        })
        .allow(null),
    category: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid cloth category ID provided",
        })
        .required(),
    tags: Joi.array().items(Joi.string()).allow(null),
    audit: Joi.array().items(Joi.string()).allow(null),
});

export default {
    clothSchema,
    clothVariantSchema,
};
