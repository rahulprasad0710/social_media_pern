import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref("password"),
    mobileNumber: Joi.number().required(),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
    password: Joi.string().required(),
});

const getAllUsersSchema = Joi.object({
    pageIndex: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
    searchTerm: Joi.string(),
    mobileNumber: Joi.number(),
    status: Joi.string().valid("ACTIVE", "INACTIVE"),
});

export { signupSchema, loginSchema, getAllUsersSchema };
