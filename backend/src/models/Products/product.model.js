import mongoose from "mongoose";
import PRODUCT_ENUMS from "../../constants/ProductEnums.js";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        productCode: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        brand: {
            type: String,
            required: true,
        },
        featuredIn: {
            type: String,
            enum: PRODUCT_ENUMS.PRODUCT_FEATURED_IN_ARRAY,
            default: PRODUCT_ENUMS.PRODUCT_FEATURED_IN.NORMAL,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        mrp: {
            type: Number,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },

        thumbnil: {
            type: String,
            ref: "FileData",
        },
        image: [
            {
                type: String,
                ref: "FileData",
            },
        ],
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: PRODUCT_ENUMS.PRODUCT_STATUS_ARRAY,
            default: PRODUCT_ENUMS.PRODUCT_STATUS.APPROVAL_PENDING,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
