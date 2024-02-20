import ProductModel from "../models/Products/product.model.js";
import UserModel from "../models/User.model.js";
import UserCartModel from "../models/customer/userCart.model.js";
import AppError from "../utils/AppError.js";
import PRODUCT_ENUMS from "../constants/ProductEnums.js";

// wishlist
const getWishlist = async (userId) => {
    const wishlist = await UserModel.findById(userId)
        .select("wishlist")
        .populate({
            path: "wishlist",
            populate: {
                path: "thumbnil",
            },
        });
    if (!wishlist) throw new AppError("Wishlist not found", 404);
    return wishlist;
};

const addToWishlist = async (userId, productId) => {
    const product = await ProductModel.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    if (product.status !== PRODUCT_ENUMS.PRODUCT_STATUS.ACTIVE) {
        throw new AppError("Product is not available", 404);
    }

    // const { wishlist } = user;
    // wishlist.push(product.id);
    const savedWishlist = await UserModel.findByIdAndUpdate(
        userId,
        { $push: { wishlist: productId } },
        {
            new: true,
            runValidators: true,
            timestamps: true,
        }
    )
        .populate("wishlist")
        .select("wishlist");
    return savedWishlist;
};

const removeFromWishlist = async (userId, productId) => {
    const product = await ProductModel.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    const savedWishlist = await UserModel.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        {
            new: true,
            runValidators: true,
            timestamps: true,
        }
    )
        .populate("wishlist")
        .select("wishlist");
    return savedWishlist;
};

// cart
const getCart = async (userId) => {
    const userWithCart = await UserCartModel.findOne({ user: userId }).populate(
        {
            path: "cart.product",
            populate: {
                path: "thumbnil",
            },
        }
    );
    if (!userWithCart) {
        const newCart = new UserCartModel({
            user: userId,
            cart: [],
        });
        const savedCart = await newCart.save();
        return savedCart.cart;
    }

    return userWithCart.cart;
};

const addToCart = async (userId, productId, quantity) => {
    const product = await ProductModel.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

    if (product.status !== PRODUCT_ENUMS.PRODUCT_STATUS.ACTIVE) {
        throw new AppError("Product is not available", 404);
    }

    const user = await UserCartModel.findOne({ user: userId });

    if (!user) {
        const newCart = new UserCartModel({
            user: userId,
            cart: [
                {
                    product: productId,
                    quantity,
                },
            ],
        });
        const savedCart = await newCart.save();
        return savedCart;
    }
    const cartItem = user.cart.find(
        (item) => item.product.toString() === productId
    );
    if (cartItem) {
        cartItem.quantity = quantity;
    } else {
        user.cart.push({
            product: productId,
            quantity,
        });
    }
    const savedCart = await user.save();
    return savedCart;
};

const removeFromCart = async (userId, productId) => {
    const user = await UserCartModel.findOne({ user: userId });
    if (!user) throw new AppError("Something Went Wrong", 500);

    const cartItem = user.cart.find(
        (item) => item.product.toString() === productId
    );
    if (!cartItem) throw new AppError("Product not found", 404);

    user.cart.pull(cartItem);
    const savedCart = await user.save();
    return savedCart;
};

const clearCart = async (userId) => {
    const user = await UserCartModel.findOne({ user: userId });
    if (!user) throw new AppError("Something Went Wrong", 500);

    user.cart = [];
    const savedCart = await user.save();
    return savedCart;
};

export default {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
};
