// Path: src/models/role.model.js

import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const Permission = mongoose.model("Permission", permissionSchema);

export default Permission;
