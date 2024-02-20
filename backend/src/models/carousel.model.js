import mongoose, { Schema, model } from "mongoose";

const corouselSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FileData",
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "INACTIVE", "DISABLED"],
        default: "ACTIVE",
    },
});

const Corousel = model("Corousel", corouselSchema);

export default Corousel;
