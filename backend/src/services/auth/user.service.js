import User from "../../models/User.model.js";
import AppError from "../../utils/AppError.js";

const signup = async (username, password, email, name, mobileNumber) => {
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) throw new AppError("Username already exists", 400);

    const isMobileNumberExist = await User.findOne({ mobileNumber });

    if (isMobileNumberExist)
        throw new AppError("User with this mobile Number already exists", 400);
    const newUser = User({
        username,
        password,
        email,
        name,
        mobileNumber,
        status: "ACTIVE",
    });

    const savedUser = await newUser.save();
    const { id } = savedUser;
    return id;
};

const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) throw new AppError("User not found", 404);
    if (user.status !== "ACTIVE") throw new AppError("User is not active", 401);

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        username: user.username,
        status: user.status,
        isAdmin: false,
        permission: [],
    };
};

const login = async (email, password) => {
    const user = await User.findOne({
        email,
    });
    if (!user) throw new AppError("Wrong Credentails", 401);
    const isPasswordCorrect = await user.matchPassword(password);

    if (!isPasswordCorrect) throw new AppError("Wrong Credentails", 401);
    const accessToken = user.generateAuthToken();

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        username: user.username,
        status: user.status,
        isAdmin: false,
        permission: [],
        accessToken,
    };
};

export default { signup, login, getUserById };
