import Joi from "joi";
import { isValidMongoDBId } from "../utils/checkMongodbId.js";

const cartSchema = Joi.object({
    productId: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("any.invalid id");
            }
            return value;
        })
        .messages({
            "any.invalid id": "Invalid Product ID provided",
        })
        .required(),
    quantity: Joi.number().integer().positive().required(),
});

export default cartSchema;
