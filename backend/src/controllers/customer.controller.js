import AppError from "../utils/AppError.js";
import customerService from "../services/customer.service.js";

// Wishlist
const getWishlist = async (req, res) => {
    const { id: userId } = req.user;
    const wishlist = await customerService.getWishlist(userId);
    if (!wishlist) throw new AppError("Wishlist not found", 404);
    res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully.",
        data: wishlist,
    });
};

const addToWishlist = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const savedWishlist = await customerService.addToWishlist(userId, id);
    if (!savedWishlist) throw new AppError("Something Went Wrong.", 500);
    res.status(200).json({
        success: true,
        message: "Product added to wishlist. ",
        data: savedWishlist,
    });
};

const removeFromWishlist = async (req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const savedWishlist = await customerService.removeFromWishlist(userId, id);
    if (!savedWishlist) throw new AppError("Something Went Wrong.", 500);

    res.status(200).json({
        success: true,
        message: "Product removed from wishlist. ",
        data: savedWishlist,
    });
};

// cart
const getCart = async (req, res) => {
    const { id: userId } = req.user;
    const cart = await customerService.getCart(userId);
    res.status(200).json({
        success: true,
        message: "Cart fetched successfully.",
        data: cart,
    });
};

const addToCart = async (req, res) => {
    const { id: userId } = req.user;
    const { productId, quantity } = req.body;
    const cart = await customerService.addToCart(userId, productId, quantity);
    if (!cart) throw new AppError("Something Went Wrong.", 500);
    res.status(200).json({
        success: true,
        message: "Product added to cart.",
        data: cart,
    });
};

const removeFromCart = async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;
    const cart = await customerService.removeFromCart(userId, id);
    if (!cart) throw new AppError("Something Went Wrong.", 500);
    res.status(200).json({
        success: true,
        message: "Product removed from cart.",
        data: cart,
    });
};

export default {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    getCart,
    addToCart,
    removeFromCart,
};
