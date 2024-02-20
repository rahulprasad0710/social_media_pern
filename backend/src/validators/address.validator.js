import Joi from "joi";

const addressSchema = Joi.object({
    fullName: Joi.string().required(),
    houseNumberName: Joi.string(),
    mobileNumber: Joi.string().required(),
    mobileNumber2: Joi.string(),
    addressLine1: Joi.string().required(),
    addressLine2: Joi.string(),
    ward: Joi.number().integer().positive().required(),
    townCity: Joi.string().required(),
    district: Joi.string().required(),
    province: Joi.string().required(),
    addressType: Joi.string().required(),
});

export default addressSchema;
