import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    query: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    numberOfResults: {
        type: Number,
        required: true,
    },
});

const SearchQuery = mongoose.model("Search", searchSchema);
export default SearchQuery;
