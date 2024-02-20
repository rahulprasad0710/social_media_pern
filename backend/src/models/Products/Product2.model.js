import mongoose from "mongoose";

// Parent Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    // Other common product fields...
});

// Book Variant Schema
const bookVariantSchema = new mongoose.Schema({
    author: { type: String, required: true },
    edition: { type: String },
    language: { type: String },
    genre: { type: String },
    // Other book-specific fields...
});

// Clothes Variant Schema
const clothesVariantSchema = new mongoose.Schema({
    size: { type: String, required: true },
    color: { type: String, required: true },
    // Other clothes-specific fields...
});

// Electronics Variant Schema
const electronicsVariantSchema = new mongoose.Schema({
    // Electronics-specific fields...
});

// Variant Discriminator Key
const variantDiscriminatorKey = "variantType";

// Variant Options
const variantOptions = {
    discriminatorKey: variantDiscriminatorKey,
};

// Register Variant Schemas with Parent Product Schema
productSchema.discriminator("Book", bookVariantSchema, variantOptions);
productSchema.discriminator("Clothes", clothesVariantSchema, variantOptions);
productSchema.discriminator(
    "Electronics",
    electronicsVariantSchema,
    variantOptions
);

// Product Model
const Product = mongoose.model("Product", productSchema);

export default Product;
