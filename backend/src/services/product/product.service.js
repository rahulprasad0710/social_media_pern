import { v4 as uuidv4 } from "uuid";
import Product from "../../models/Products/product.model.js";
import { slugName } from "../../utils/slugId.js";
import AppError from "../../utils/AppError.js";
import categoryService from "../category.service.js";
import PRODUCT_ENUMS from "../../constants/ProductEnums.js";

const getAllProducts = async (
    searchTerm,
    categoryId,
    status,
    featuredIn,
    limit,
    pageIndex
) => {
    const filter = {};

    if (featuredIn) {
        filter.featuredIn = featuredIn;
    }

    if (status) {
        filter.status = status;
    }
    const sort = { timestamp: 1 };
    const skip = (pageIndex - 1) * limit;

    if (searchTerm) {
        filter.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { brand: { $regex: searchTerm, $options: "i" } },
        ];
    }

    if (categoryId) {
        filter.category = categoryId;
    }

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .populate("thumbnil")
        .populate("category");

    return {
        data: products,
        pagination: {
            pageIndex,
            totalPages,
            totalResults: total,
            limit,
        },
    };
};

const getAllPublicProducts = async (
    searchTerm,
    categoryId,
    status,
    featuredIn,
    limit,
    pageIndex
) => {
    const filter = {};

    if (featuredIn) {
        filter.featuredIn = featuredIn;
    }

    if (status) {
        filter.status = status;
    } else {
        filter.status = { $in: PRODUCT_ENUMS.PUBLIC_ALLOWED_PRODUCT_STATUS };
    }

    const sort = { timestamp: 1 };
    const skip = (pageIndex - 1) * limit;

    if (searchTerm) {
        filter.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { brand: { $regex: searchTerm, $options: "i" } },
        ];
    }

    if (categoryId) {
        filter.category = categoryId;
    }

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const products = await Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .populate("thumbnil")
        .populate("category");

    return {
        data: products,
        pagination: {
            pageIndex,
            totalPages,
            totalResults: total,
            limit,
        },
    };
};

const updateProductStatus = async (id, status) => {
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found.", 404);

    if (product.status === PRODUCT_ENUMS.PRODUCT_STATUS.DISCONTINUED) {
        throw new AppError(
            "Product is discontinued. Cannot change the status.",
            400
        );
    }

    const savedProduct = await Product.findByIdAndUpdate(
        id,
        {
            status,
        },
        {
            new: true,
            runValidators: true,
        }
    );
    if (!savedProduct)
        throw new AppError("Product not updated. Something Went Wrong", 500);

    return { savedProduct, previouseStatus: product.status };
};

const createProduct = async (product, imgArray) => {
    const category = await categoryService.getCategoryById(product.category);
    if (category.level !== 3)
        throw new AppError(
            "Product can be added to LEVEL 3 category only.",
            400
        );

    const uniqueProductCode = uuidv4().slice(0, 6);
    const productSlug = `${uniqueProductCode}-${slugName(product.name)}`;

    let thumbnilImageId;
    const imageIds = [];
    if (imgArray.length > 0) {
        thumbnilImageId = imgArray[0]._id;
        imgArray.forEach((image) => {
            if (product.thumbnilName === image.originalname) {
                thumbnilImageId = image._id;
            }
            imageIds.push(image._id);
        });
    }

    const newProduct = {
        name: product.name,
        productCode: uniqueProductCode,
        slug: productSlug,
        brand: product.brand,
        description: product.description,
        price: product.price,
        mrp: product.mrp,
        category: category._id,
        thumbnil: thumbnilImageId,
        image: imageIds,
        featuredIn: product.featuredIn,
        quantity: product.quantity,
        sold: 0,
        status: PRODUCT_ENUMS.PRODUCT_STATUS.APPROVAL_PENDING,
    };

    const savedProduct = Product.create(newProduct);
    if (!savedProduct) throw new AppError("Product not created", 500);

    return savedProduct;
};

const getProductBySlug = async (slug) => {
    const product = await Product.findOne({
        slug,
        status: PRODUCT_ENUMS.PRODUCT_STATUS.ACTIVE,
    })
        .populate("category")
        .populate("thumbnil")
        .populate("image");

    if (!product) throw new AppError("Product not found.", 404);
    return product;
};

const getProductById = async (id) => {
    const product = await Product.findById(id)
        .populate("category")
        .populate("image")
        .populate("thumbnil");

    if (!product) throw new AppError("Product not found.", 404);

    return product;
};

const updateProduct = async (
    id,
    product,
    deletedImageIds,
    newUploadedImageArray
) => {
    const oldProduct = await Product.findById(id).populate("thumbnil");

    // compare the product and savedProduct
    if (oldProduct.productCode !== product.productCode) {
        throw new AppError("Product code cannot be changed.", 400);
    }
    const newProduct = { ...product };
    delete newProduct.status;
    // check for product name change
    if (oldProduct.name !== product.name) {
        const productSlug = `${oldProduct.productCode}-${slugName(
            product.name
        )}`;
        newProduct.slug = productSlug;
    }

    // thumbnil update
    // check for thumbnil deleted in deletedImageIds
    const oldThumbnilId = oldProduct.thumbnil;
    if (deletedImageIds.length > 0) {
        if (deletedImageIds.includes(oldThumbnilId)) {
            throw new AppError(
                "Thumbnil image cannot be deleted. Please a new thumbil Image",
                400
            );
        }
    }

    // if thumbnil in changed
    if (product?.thumbnilName !== oldProduct.thumbnil.originalname) {
        const newThumbnilId = newUploadedImageArray.find(
            (image) => image.originalname === product.thumbnilName
        )._id;
        newProduct.thumbnil = newThumbnilId;
    }

    // image update
    const imgArrayIds = oldProduct.image;
    let newFilteredImgArrayIds = [];
    // check for image deleted in deletedImageIds
    if (deletedImageIds.length > 0) {
        newFilteredImgArrayIds = imgArrayIds.filter(
            (deleteItemId) => !deletedImageIds.includes(deleteItemId)
        );
    }
    // if new image uploaded
    if (newUploadedImageArray.length > 0) {
        newUploadedImageArray.forEach((image) => {
            newFilteredImgArrayIds.push(image._id);
        });
    }

    newProduct.image = newFilteredImgArrayIds;

    // update the product
    const savedProduct = await Product.findByIdAndUpdate(id, newProduct, {
        new: true,
        runValidators: true,
    });

    if (!savedProduct)
        throw new AppError("Product not updated. Something Went Wrong", 500);

    return savedProduct;
};

export default {
    createProduct,
    getAllProducts,
    getProductById,
    getProductBySlug,
    updateProduct,
    updateProductStatus,
    getAllPublicProducts,
};
