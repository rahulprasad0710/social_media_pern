import mongoose from "mongoose";

const DocumentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

export const DocumentType = mongoose.model("DocumentType", DocumentTypeSchema);

const OfficialDocumentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    documentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DocumentType",
        required: true,
    },

    documentNumber: {
        type: String,
        required: true,
    },
    documentImage: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const OfficialDocument = mongoose.model(
    "OfficialDocument",
    OfficialDocumentSchema
);

export default OfficialDocument;
