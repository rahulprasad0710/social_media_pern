import Joi from "joi";
import { PERMISSION_ARRAY, STATUS_ARRAY } from "../constants/ServiceAction.js";

const adminSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    status: Joi.string()
        .valid(...STATUS_ARRAY)
        .required(),
    jobPosition: Joi.string(),
    isAdmin: Joi.boolean().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
    mobileNumber: Joi.number().required(),
    position: Joi.string().required(),
    permission: Joi.array().items(Joi.string().valid(...PERMISSION_ARRAY)),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const updateAdminSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    status: Joi.string()
        .valid(...STATUS_ARRAY)
        .required(),
    jobPosition: Joi.string(),
    isAdmin: Joi.boolean().required(),
    mobileNumber: Joi.number().required(),
    position: Joi.string().required(),
    permission: Joi.array().items(Joi.string().valid(...PERMISSION_ARRAY)),
});

export { adminSchema, loginSchema, updateAdminSchema };
