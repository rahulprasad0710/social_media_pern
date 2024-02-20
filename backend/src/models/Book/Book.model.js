import mongoose, { Schema } from "mongoose";
import { FEATURED_IN } from "../../constants/Enums.js";
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: {
        type: Schema.Types.ObjectId,
        ref: "BookCategory",
        required: true,
    },

    featuredIn: {
        type: String,
        required: true,
        enum: FEATURED_IN,
        default: false,
    },

    thumbnil: {
        type: Schema.Types.ObjectId,
        ref: "FileData",
    },
    images: [
        {
            type: Schema.Types.ObjectId,
            ref: "FileData",
        },
    ],
    author: [
        {
            type: Schema.Types.ObjectId,
            ref: "Author",
        },
    ],
    ISBN: { type: String },
    publisher: {
        type: Schema.Types.ObjectId,
        ref: "Publisher",
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: "BookTag",
        },
    ],
    language: {
        type: Schema.Types.ObjectId,
        ref: "Language",
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    pageCount: { type: Number },
    format: { type: String },
    edition: { type: String },
});

bookSchema.pre("save", function (next) {
    this.title = this.title.trim();
    next();
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
