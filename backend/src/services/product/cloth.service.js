import { Cloth, ClothVariant } from "../../models/Products/cloth.model.js";
import AppError from "../../utils/AppError.js";
import auditService from "../audit.service.js";
import { SERVICES, ACTIONS } from "../../constants/ServiceAction.js";

//  CRUD operations for cloth variant

const addClothVariantInBulk = async (varientArray) => {
    // create cloth variant
    const clothVariant = await ClothVariant.insertMany(varientArray);
    return clothVariant;
};

//  CRUD operations for cloth
const getAllCloth = async (req, res, next) => {
    try {
        const cloth = await Cloth.find();
        res.status(200).json({ success: true, data: cloth });
    } catch (error) {
        next(error);
    }
};

const addCloth = async (
    name,
    varientArray,
    thumbnil,
    categoryId,
    tagArray,
    userId,
    auditDescription
) => {
    const isClothExist = await Cloth.find({
        name,
    });

    if (isClothExist) {
        throw new AppError(400, "Cloth with this name already exist");
    }

    // create cloth variant

    const clothVariant = await addClothVariantInBulk(varientArray);

    if (!clothVariant) {
        throw new AppError(500, "Cloth variant creation failed");
    }

    const clothVariantIds = [];
    clothVariant.forEach((element) => {
        clothVariantIds.push(element._id);
    });

    // create audit

    const audit = await auditService.addAudit(
        userId,
        ACTIONS.CREATED,
        SERVICES.CLOTHES_SERVICE,
        auditDescription
    );

    const cloth = await Cloth.create({
        name,
        variant: clothVariantIds,
        thumbnil,
        category: categoryId,
        tags: tagArray,
        audit: [audit._id],
    });

    if (!cloth) {
        throw new AppError(500, "Cloth creation failed");
    }

    return cloth;
};

const getClothById = async (id) => {
    const cloth = await Cloth.findById(id)
        .populate("variant")
        .populate("category")
        .populate("tags");
    if (!cloth) throw new AppError("Cloth not found", 404);
    return cloth;
};

export default {
    getAllCloth,
    addCloth,
    getClothById,
};
