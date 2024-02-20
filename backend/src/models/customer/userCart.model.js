import mongoose from "mongoose";

const userCartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unqiue: true,
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
                unqiue: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

const userCartModel = mongoose.model("UserCart", userCartSchema);

export default userCartModel;
