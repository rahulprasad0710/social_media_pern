import { Schema, model } from "mongoose";

const colorSchema = new Schema({
    name: { type: String, required: true },
    colorBase: { type: String, required: true },
    colorHexaCode: { type: String, required: true },
});

const sizeSchema = new Schema({
    sizeName: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    deminsion: { type: String },
});

export const Color = model("Color", colorSchema);
export const Size = model("Size", sizeSchema);
