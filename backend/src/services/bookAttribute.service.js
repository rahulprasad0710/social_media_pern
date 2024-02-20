import {
    BookCategory,
    BookTag,
    Author,
    Publisher,
    Course,
} from "../models/Book/Attribute.model.js";
import AppError from "../utils/AppError.js";

const getBookAttributes = async () => {
    const [categories, tags, authors, publishers] = await Promise.all([
        BookCategory.find(),
        BookTag.find(),
        Author.find(),
        Publisher.find(),
    ]);
    return { categories, tags, authors, publishers };
};
// Category
const addBookCategory = async (data) => {
    const { title } = data;
    const existingCategory = await BookCategory.findOne({ title });
    if (existingCategory) {
        throw new Error("A book category with the same name already exists.");
    }
    const category = await BookCategory.create(data);
    return category;
};

const getBookCategory = async () => {
    const categories = await BookCategory.find();
    return categories;
};

const updateBookCategory = async (id, data) => {
    const category = await BookCategory.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        timestamps: true,
    });

    return category;
};

//  Tags Service

const addBookTag = async (data) => {
    const { title } = data;

    const existingBookTag = await BookTag.findOne({ title });
    if (existingBookTag) {
        throw new Error("A book tag with the same name already exists.");
    }

    const tag = await BookTag.create(data);
    if (!tag) {
        throw new AppError("Tag not created", 400);
    }
    return tag;
};

const updateBookTag = async (id, data) => {
    const tag = await BookTag.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        timestamps: true,
    });
    return tag;
};

//  Author Service

const addAuthor = async (data) => {
    const author = await Author.create(data);
    if (!author) {
        throw new AppError("Author not created", 400);
    }
    return author;
};

const updateAuthor = async (id, data) => {
    const author = await Author.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        timestamps: true,
    });
    if (!author) {
        throw new AppError("Author not updated", 400);
    }
    return author;
};

//  Publisher Service

const addPublisher = async (data) => {
    const { title } = data;

    const existingPublisher = await Publisher.findOne({ title });
    if (existingPublisher) {
        throw new Error("A publisher with the same name already exists.");
    }

    const publisher = await Publisher.create(data);
    if (!publisher) {
        throw new AppError("Publisher not created", 400);
    }
    return publisher;
};

const updatePublisher = async (id, data) => {
    const publisher = await Publisher.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        timestamps: true,
    });

    if (!publisher) {
        throw new AppError("Publisher not updated", 400);
    }
    return publisher;
};

// Course Service
const addCourse = async (data) => {
    const { title } = data;

    const existing = await Course.findOne({ title });
    if (existing) {
        throw new Error("A course with the same name already exists.");
    }
    const course = await Course.create(data);
    if (!course) {
        throw new AppError("Course not created", 400);
    }
    return course;
};

const updateCourse = async (id, data) => {
    const publisher = await Course.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        timestamps: true,
    });
    if (!publisher) {
        throw new AppError("Course not updated", 400);
    }
    return publisher;
};

export default {
    getBookAttributes,
    getBookCategory,
    addBookCategory,
    addBookTag,
    addAuthor,
    addPublisher,
    addCourse,
    updateBookCategory,
    updateBookTag,
    updateAuthor,
    updatePublisher,
    updateCourse,
};
