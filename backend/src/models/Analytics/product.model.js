import mongoose from "mongoose";
import { UserActionEnum, ProductTypeEnum } from "../../constants/Enums.js";

const productActionSchema = new mongoose.Schema({
    audit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Audit",
        required: false,
    },
    productType: {
        type: String,
        enum: ProductTypeEnum,
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    actionAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    actionType: {
        type: String,
        required: true,
        enum: UserActionEnum,
    },
});

const ProductAction = mongoose.model("ProductAction", productActionSchema);

export default ProductAction;
