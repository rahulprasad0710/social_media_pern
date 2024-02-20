import Joi from "joi";
import { isValidMongoDBId } from "../utils/checkMongodbId.js";

const orderSchema = Joi.object({
    paymentMethod: Joi.string().required(),
    shippingAddressId: Joi.string().custom((value, helpers) => {
        if (!isValidMongoDBId(value)) {
            return helpers.error("Invalid shipping Address Id");
        }
        return value;
    }),
});

export default orderSchema;
