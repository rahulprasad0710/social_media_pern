import authService from "../services/auth/user.service.js";
import adminService from "../services/auth/admin.service.js";

const signup = async (req, res) => {
    const { username, password, email, name, mobileNumber } = req.body;
    const user = await authService.signup(
        username,
        password,
        email,
        name,
        mobileNumber
    );
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not created",
        });
    }
    return res.status(201).json({
        success: true,
        data: user,
        message: "User created successfully",
    });
};

const verifyUser = async (req, res) => {
    try {
        const { verifiedToken } = req;
        let user = null;
        if (verifiedToken.type === "USER") {
            const data = await authService.getUserById(verifiedToken.id);
            user = {
                ...data,
                accessToken: verifiedToken.token,
            };
            return res.status(200).json({
                success: true,
                data: user,
                message: "User verified successfully",
            });
        }
        if (verifiedToken.type === "ADMIN") {
            const data = await adminService.getAdminById(verifiedToken.id);
            user = {
                ...data,
                accessToken: verifiedToken.token,
            };
            return res.status(200).json({
                success: true,
                data: user,
                message: "User verified successfully",
            });
        }

        return res.status(401).json({
            success: false,
            data: user,
            message: "User not verified",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            data: null,
            message: error,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user) {
        res.status(400).json({
            success: false,
            message: "User not logged in",
        });
    }
    if (user.status !== "ACTIVE") {
        return res.status(401).json({
            success: false,
            message: "User not active",
        });
    }
    return res.status(200).json({
        success: true,
        data: user,
        message: "User logged in successfully",
    });
};

export default { signup, login, verifyUser };
