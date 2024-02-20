import mongoose from "mongoose";
import { RelatedToTypeEnum } from "../constants/Enums.js";
import configSetting from "../config/index.js";

const { BASE_URL } = configSetting;

const BigFileDataSchema = new mongoose.Schema({
    filename: String,
    filetype: String,
    fileSize: Number,
    chunks: [
        {
            index: Number,
            data: Buffer,
        },
    ],
});

export const BigFileData = mongoose.model(
    "BigFileDataSchema",
    BigFileDataSchema
);

const FileDataSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
            required: true,
        },
        originalname: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        extension: {
            type: String,
            required: true,
        },
        mimetype: {
            type: String,
        },
        fileType: {
            type: String,
        },
        relatedTo: {
            type: String,
            enum: RelatedToTypeEnum,
        },
        dimensions: {
            width: {
                type: Number,
                default: 0,
                required: false,
            },
            height: {
                type: Number,
                default: 0,
                required: false,
            },
        },
        cloudPath: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

FileDataSchema.virtual("pathName").get(function setFilePath() {
    return `${BASE_URL}/uploads/${this.relatedTo}/${this.filename}`;
});

FileDataSchema.set("toObject", { virtuals: true });
FileDataSchema.set("toJSON", { virtuals: true });

export const FileData = mongoose.model("FileData", FileDataSchema);
