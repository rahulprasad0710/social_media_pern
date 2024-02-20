import Joi from "joi";

const corouselSchema = Joi.object({
    title: Joi.string().required(),
    url: Joi.string().required(),
    status: Joi.string().required(),
    description: Joi.string(),
});

export default corouselSchema;
