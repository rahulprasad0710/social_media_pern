import User from "../models/User.model.js";
import AppError from "../utils/AppError.js";

const getAll = async (searchTerm, mobileNumber, status, limit, pageIndex) => {
    const filter = {};

    if (status) {
        filter.status = status;
    }

    if (mobileNumber) {
        filter.mobileNumber = mobileNumber;
    }

    if (searchTerm) {
        filter.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { username: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
        ];
    }

    const sort = { name: 1 };
    const skip = (pageIndex - 1) * limit;
    const total = await User.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    const users = await User.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select("-password")
        .populate("addresses")
        .populate("wishlist");
    return {
        users,
        pagination: {
            pageIndex,
            totalPages,
            totalResults: total,
            limit,
        },
    };
};

const getById = async (id) => {
    const user = await User.findById(id)
        .select("-password")
        .populate("addresses")
        .populate("wishlist");

    if (!user) throw new AppError("User not found", 404);
    return user;
};

const update = async (
    id,
    { profilePicture: _profilePicture, email: _email, ...rest }
) => {
    const user = await User.findByIdAndUpdate(id, rest, {
        new: true,
        runValidators: true,
        timestamps: true,
    });
    return user;
};

const updatePassword = async (id, oldPassword, password) => {
    const alreadyUser = User.findById(id);
    if (!alreadyUser) throw new AppError("User not found", 404);
    const isOldPasswordMatch = await alreadyUser.matchPassword(oldPassword);
    if (!isOldPasswordMatch) throw new AppError("Old Password is wrong", 400);

    const isMatch = await alreadyUser.matchPassword(password);
    if (isMatch) throw new AppError("Password is same as previous", 400);
    const user = await User.findByIdAndUpdate(id, password, {
        new: true,
        runValidators: true,
        timestamps: true,
    }).select("-password");
    return user;
};

const updateStatus = async (id, status) => {
    const user = await User.findByIdAndUpdate(id, status, {
        new: true,
        runValidators: true,
        timestamps: true,
    }).select("-password");
    return user;
};

export default { getAll, getById, update, updatePassword, updateStatus };
