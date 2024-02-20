// Description: Joi validation schema for audit query.
import Joi from "joi";
import { isValidMongoDBId } from "../utils/checkMongodbId.js";
import {
    PERMISSION_ARRAY,
    ACTIONS_ARRAY,
    ENTITY_TYPE_ARRAY,
    SERVICES_ARRAY,
} from "../constants/ServiceAction.js";

const auditQuerySchema = Joi.object({
    userId: Joi.string()
        .custom((value, helpers) => {
            if (!isValidMongoDBId(value)) {
                return helpers.error("Invalid user Id");
            }
            return value;
        })
        .allow(null),
    serviceName: Joi.string().valid(...SERVICES_ARRAY),
    permissionType: Joi.string().valid(...PERMISSION_ARRAY),
    action: Joi.string().valid(...ACTIONS_ARRAY),
    fromDate: Joi.date().iso(),
    toDate: Joi.date().iso().greater(Joi.ref("fromDate")),
    entityType: Joi.string().valid(...ENTITY_TYPE_ARRAY),
    pageIndex: Joi.number().integer().positive(),
    limit: Joi.number().integer().positive(),
});

export default auditQuerySchema;
