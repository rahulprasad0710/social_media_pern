import { Schema, model } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        unique: false,
    },
    children: [
        {
            type: Schema.Types.ObjectId,
            ref: "Category",
            default: null,
        },
    ],
    level: {
        type: Number,
        enum: [0, 1, 2, 3],
        default: 1,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE",
    },
});

categorySchema.index({ children: 1 });

const Category = model("Category", categorySchema);

export default Category;
