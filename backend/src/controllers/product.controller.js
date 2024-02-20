import productService from "../services/product/product.service.js";
import auditService from "../services/audit.service.js";
import fileUploadService from "../services/fileUpload.service.js";
import { SERVICES, ACTIONS, ENTITY_TYPE } from "../constants/ServiceAction.js";
import PAGINATION from "../constants/Pagination.js";
import logger from "../utils/logger.js";

const getAllProducts = async (req, res) => {
    const { searchTerm, categoryId, status, featuredIn, limit, pageIndex } =
        req.query;
    const pagination = {
        limit: limit || PAGINATION.LIMIT,
        pageIndex: pageIndex || PAGINATION.PAGE_INDEX,
    };
    const productData = await productService.getAllProducts(
        searchTerm,
        categoryId,
        status,
        featuredIn,
        pagination.limit,
        pagination.pageIndex
    );
    res.status(200).json({
        sucess: true,
        data: productData.data,
        pagination: productData.pagination,
        message: "Get all products successfully",
    });
};
const getAllPublicProducts = async (req, res) => {
    const { searchTerm, categoryId, status, featuredIn } = req.query;
    const { limit, pageIndex } = req.pagination;
    const productData = await productService.getAllPublicProducts(
        searchTerm,
        categoryId,
        status,
        featuredIn,
        limit,
        pageIndex
    );
    res.status(200).json({
        success: true,
        data: productData.data,
        pagination: productData.pagination,
        message: "Get all products successfully",
    });
};

const updateProductStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const { savedProduct, previouseStatus } =
        await productService.updateProductStatus(id, status);
    // update audit
    const { id: userId, permissionType } = req.user;
    await auditService.addAudit2(
        savedProduct._id,
        ENTITY_TYPE.PRODUCT,
        userId,
        permissionType,
        SERVICES.PRODUCT_SERVICE,
        ACTIONS.UPDATED,
        `Updated product ${savedProduct.slug} status to ${status} from ${previouseStatus}.`
    );
    res.status(200).json({
        success: true,
        data: savedProduct,
        message: `Product status updated with  ${status}.`,
    });
};

const addProduct = async (req, res) => {
    const imageArray = await fileUploadService.uploadImageToCloudinary(
        req.files,
        "PRODUCT"
    );
    const product = await productService.createProduct(req.body, imageArray);
    const { id: userId, permissionType } = req.user;
    try {
        await auditService.addAudit2(
            product._id,
            ENTITY_TYPE.PRODUCT,
            userId,
            permissionType,
            SERVICES.PRODUCT_SERVICE,
            ACTIONS.CREATED,
            `Added product ${product.slug} successfully.`
        );
    } catch (error) {
        logger.error(error);
    }
    res.status(200).json({
        success: true,
        data: product,
        message: `Product added with  ${product.slug} successfully`,
    });
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { deletedImageIds } = req.body;
    const imageArray = await fileUploadService.uploadFile(req.files, "PRODUCT");
    const product = await productService.updateProduct(
        id,
        req.body,
        deletedImageIds,
        imageArray
    );
    // update audit
    const { id: userId, permissionType } = req.user;
    await auditService.addAudit2(
        product._id,
        ENTITY_TYPE.PRODUCT,
        userId,
        permissionType,
        SERVICES.PRODUCT_SERVICE,
        ACTIONS.UPDATED,
        `Updated product ${product.slug} successfully.`
    );

    res.status(200).json({
        success: true,
        data: product,
        message: `Product updated with  ${product.slug} successfully`,
    });
};

const getProductBySlug = async (req, res) => {
    const product = await productService.getProductBySlug(req.params.slug);
    res.status(200).json({
        success: true,
        data: product,
        message: "Product fetched successfully",
    });
};

const getProductById = async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
        success: true,
        data: product,
        message: "Product fetched successfully",
    });
};

export default {
    getAllProducts,
    addProduct,
    updateProduct,
    getProductBySlug,
    getProductById,
    updateProductStatus,
    getAllPublicProducts,
};
