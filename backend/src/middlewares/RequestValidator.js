import { checkMongodbIdFormParamsSchema } from "../utils/checkMongodbId.js";

const RequestValidator =
    (schema, reqType = "body") =>
    (req, res, next) => {
        const validateData = reqType;

        const { error } = schema.validate(req[validateData], {
            abortEarly: false,
        });
        const valid = error == null;
        if (valid) {
            next();
        } else {
            const { details } = error;
            // console.log("error", error);
            // const message = details.map((i) => i.message).join(",");
            res.status(422).json({
                success: false,
                error: {
                    type: "Validation error",
                    details,
                },
                data: null,
                type: "RequestValidator",
            });
        }
    };

export const validateMongodbIdFromParams = RequestValidator(
    checkMongodbIdFormParamsSchema,
    "params"
);

export default RequestValidator;
