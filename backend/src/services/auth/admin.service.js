import Admin from "../../models/admin.model.js";
import AppError from "../../utils/AppError.js";

const getAdminById = async (id) => {
    const user = await Admin.findById(id);
    if (!user) throw new AppError("Admin not found", 404);
    if (user.status !== "ACTIVE") throw new AppError("Unathourized.", 401);

    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        mobileNumber: user.mobileNumber,
        username: user.username,
        status: user.status,
        position: user.position,
        isAdmin: user.isAdmin,
        permission: user.permission,
    };
};

const login = async (email, password) => {
    const user = await Admin.findOne({
        email,
    });
    if (!user) throw new AppError("Wrong Credentails", 401);
    if (user.status !== "ACTIVE") throw new AppError("Unathourized.", 401);
    const checkPassword = await user.matchPassword(password);
    if (!checkPassword) throw new AppError("Wrong Credentails", 401);
    const accessToken = user.generateAuthToken();

    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        mobileNumber: user.mobileNumber,
        username: user.username,
        status: user.status,
        position: user.position,

        isAdmin: user.isAdmin,
        permission: user.permission,
        accessToken,
    };
};

export default { login, getAdminById };
