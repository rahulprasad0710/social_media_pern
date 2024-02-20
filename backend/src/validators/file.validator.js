import Joi from "joi";

const fileSchema = Joi.object({
    relatedTo: Joi.string().required(),
    file: Joi.string(),
});

export default fileSchema;
