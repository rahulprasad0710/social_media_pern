import mongoose, { Schema } from "mongoose";

// ----------------Publisher-----------------------
const publisherSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    address: { type: String },
});

publisherSchema.pre("save", function (next) {
    this.title = this.title.trim();
    next();
});

export const Publisher = mongoose.model("Publisher", publisherSchema);

//-------------------Book Category---------------------------------
const bookCategorySchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
});
export const BookCategory = mongoose.model("BookCategory", bookCategorySchema);

bookCategorySchema.pre("save", function (next) {
    this.title = this.title.trim();
    next();
});

// -----------------Book Tag--------------------

const bookTagSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true, trim: true },
});

bookTagSchema.pre("save", function (next) {
    this.title = this.title.trim();
    next();
});

export const BookTag = mongoose.model("BookTag", bookTagSchema);

// ------------Author-----------------

const authorSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String },
    image: { type: Schema.Types.ObjectId, ref: "FileData" },
});

bookTagSchema.pre("save", function (next) {
    this.title = this.title.trim();
    next();
});

export const Author = mongoose.model("Author", authorSchema);

// -----------Course---------------------

const courseSchema = new Schema({
    title: { type: String, required: true, unique: true, trim: true },
    subject: { type: String },
    level: { type: String },
    program: { type: String },
});

courseSchema.pre("save", function (next) {
    this.name = this.title.trim(); // Trimming the name field
    next();
});

export const Course = mongoose.model("Course", courseSchema);

// ---------End---------
