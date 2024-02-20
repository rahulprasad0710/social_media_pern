import AdminService from "../services/auth/admin.service.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await AdminService.login(email, password);
    if (!admin) {
        res.status(400).json({
            success: false,
            message: "Admin not logged in",
        });
    } else {
        res.status(200).json({
            success: true,
            data: admin,
            message: "Admin logged in successfully",
        });
    }
};

export default { login };
