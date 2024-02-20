import BookService from "../services/book.service.js";
import PAGINATION from "../constants/Pagination.js";

const getAll = async (req, res) => {
    const {
        searchTerm,
        limit,
        pageIndex,
        categoryId,
        tagIds,
        publisherId,
        courseId,
    } = req.query;

    const pagination = {
        limit: limit || PAGINATION.LIMIT,
        pageIndex: pageIndex || PAGINATION.PAGE_INDEX,
    };

    const books = await BookService.getAll(
        searchTerm,
        pagination.limit,
        pagination.pageIndex,
        categoryId,
        tagIds,
        publisherId,
        courseId
    );
    res.status(200).json({
        success: true,
        data: books,
        message: "Books fetched successfully",
    });
    if (!books) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Books not fetched",
        });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    const book = await BookService.getById(id);
    res.status(200).json({
        success: true,
        data: book,
        message: "Book fetched successfully",
    });
    if (!book) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book not fetched",
        });
    }
};

const create = async (req, res) => {
    const book = await BookService.create(req.body);
    res.status(201).json({
        success: true,
        data: book,
        message: "Book created successfully",
    });
    if (!book) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book not created",
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const book = await BookService.update(id, req.body);
    res.status(200).json({
        success: true,
        data: book,
        message: "Book updated successfully",
    });
    if (!book) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book not updated",
        });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    const book = await BookService.remove(id);
    res.status(200).json({
        success: true,
        data: book,
        message: "Book deleted successfully",
    });
    if (!book) {
        res.status(400).json({
            success: false,
            data: null,
            message: "Book not deleted",
        });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
};
