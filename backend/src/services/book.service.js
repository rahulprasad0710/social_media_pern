import mongoose from "mongoose";
import Book from "../models/Book/Book.model.js";
import AppError from "../utils/AppError.js";

const { ObjectId } = mongoose.Types;

const getAll = async (
    searchTerm,
    limit,
    pageIndex,
    categoryId,
    tagIds,
    publisherId,
    courseId
) => {
    const filter = {};
    const sort = { title: 1 };
    const skip = (pageIndex - 1) * limit;

    if (searchTerm) {
        filter.$or = [
            { title: { $regex: searchTerm, $options: "i" } },
            { author: { $regex: searchTerm, $options: "i" } },
            { tags: { $in: [searchTerm] } },
        ];
    }

    if (categoryId) {
        filter.category = categoryId;
    }

    if (courseId) {
        filter.course = courseId;
    }

    if (tagIds && tagIds.length > 0) {
        filter.tags = { $all: tagIds.map((tagId) => new ObjectId(tagId)) };
    }

    if (publisherId) {
        filter.publisher = new ObjectId(publisherId);
    }

    const total = await Book.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    const books = await Book.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate("category")
        .populate("tags")
        .populate("publisher")
        .populate("course");

    return {
        data: books,
        pagination: {
            pageIndex,
            totalPages,
            totalResults: total,
            limit,
        },
    };
};

const getById = async (id) => {
    const book = await Book.findById(id)
        .populate("category")
        .populate("tags")
        .populate("author")
        .populate("publisher")
        .populate("thumbnil")
        .populate("images");
    if (!book) throw new AppError("Book not found", 404);
    return book;
};

const create = async (bookData) => {
    // TODO validate all the ids are valid and exist in the database

    const book = await Book.create(bookData);
    return book;
};

const update = async (id, data) => {
    const book = await Book.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        timestamps: true,
    });
    return book;
};

const remove = async (id) => {
    const book = await Book.findByIdAndDelete(id);
    if (!book) throw new AppError("Book not found", 404);
    return book;
};

export default { getAll, getById, create, update, remove };
