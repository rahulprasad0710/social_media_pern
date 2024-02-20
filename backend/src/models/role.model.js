// Path: src/models/role.model.js

import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const role = mongoose.model("Role", roleSchema);

export default role;
