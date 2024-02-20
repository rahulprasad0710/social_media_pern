import Joi from "joi";
import { STATUS_FOR_LIST } from "../constants/appUtils.js";

export const statusSchema = Joi.object({
    title: Joi.string().required(),
    backgroundColorClass: Joi.string(),
    textColorClass: Joi.string(),
    statusType: Joi.string()
        .valid(...STATUS_FOR_LIST)
        .required(),
});

export const statusUpdateSchema = Joi.object({
    title: Joi.string().required(),
    backgroundColorClass: Joi.string(),
    textColorClass: Joi.string(),
    statusType: Joi.string()
        .valid(...STATUS_FOR_LIST)
        .required(),
});

export const statusQuerySchema = Joi.object({
    statusType: Joi.string()
        .valid(...STATUS_FOR_LIST)
        .allow(null),
});

export const statusTitleSchema = Joi.object({
    title: Joi.string().required(),
});
