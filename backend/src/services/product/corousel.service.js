import Corousel from "../../models/carousel.model.js";
import AppError from "../../utils/AppError.js";

const addCorousel = async (title, image, url, status, description) => {
    const corousel = new Corousel({
        title,
        image,
        url,
        description,
        status,
    });

    const savedCorousel = await corousel.save();
    return savedCorousel;
};

const getCorousels = async (status) => {
    const filter = {};

    if (status) {
        filter.status = status;
    } else {
        filter.status = "ACTIVE";
    }

    const corousels = await Corousel.find(filter).populate("image");
    if (!corousels) AppError.throwError("Corousels not found", 404);
    return corousels;
};

const getCorouselById = async (id) => {
    const corousel = await Corousel.findById(id);
    if (!corousel) AppError.throwError("Corousel not found with this Id.", 404);
    return corousel;
};

const updateCorousel = async (id, title, image, url, description, status) => {
    const corousel = await Corousel.findById(id);
    if (!corousel) {
        AppError.throwError("Corousel not found", 404);
    }
    if (image) {
        corousel.image = image;
    }
    corousel.title = title;
    corousel.url = url;
    corousel.description = description;
    corousel.status = status;
    const updatedCorousel = await Corousel.findByIdAndUpdate(id, corousel, {
        new: true,
        runValidators: true,
    });
    return updatedCorousel;
};

export default {
    addCorousel,
    getCorousels,
    getCorouselById,
    updateCorousel,
};
