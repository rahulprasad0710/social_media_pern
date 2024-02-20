import { Schema, model } from "mongoose";

// Define the main Product schema
const clothSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
    },
    variant: {
        type: [String],
        ref: "ClothVariant",
        required: true,
    },
    thumbnil: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        ref: "Category",
    },
    tags: {
        type: [String],
    },
    audit: [
        {
            type: Schema.Types.ObjectId,
            ref: "Audit",
            required: true,
        },
    ],
});

const clothVariantSchema = new Schema({
    color: {
        type: String,
        ref: "Color",
        required: true,
    },
    size: {
        type: String,
        ref: "Size",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    thumbnil: {
        type: String,
    },
    images: {
        type: [String],
    },
    stock: {
        type: Number,
        required: true,
    },
    tag: {
        type: [String],
    },
    sold: {
        type: Number,
        default: 0,
    },
});

export const Cloth = model("Cloth", clothSchema);

export const ClothVariant = model("ClothVariant", clothVariantSchema);
