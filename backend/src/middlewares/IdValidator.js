import { isValidMongoDBId } from "../utils/checkMongodbId.js";

const ValidateId = () => (req, res, next) => {
    const { id } = req.params;

    const isValidId = isValidMongoDBId(id);
    if (!isValidId) {
        const routePath = req.route.path;
        const pathArray = routePath.split("/").filter(Boolean);
        const routeName = pathArray[pathArray.length - 2];
        res.status(422).json({
            success: false,
            error: routeName ? `Invalid ${routeName} Id` : "Invalid Id",
        });
    } else {
        next();
    }
};

export default ValidateId;
