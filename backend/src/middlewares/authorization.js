import jwt from "jsonwebtoken";
import Key from "../config/index.js";

import adminService from "../services/auth/admin.service.js";
import userService from "../services/auth/user.service.js";

function verifyToken(req, res, next) {
    try {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            return res
                .status(401)
                .json({ success: false, error: "Token Not Found" });
        const verified = jwt.verify(token, Key.JWT_SECRET);
        if (!verified)
            return res
                .status(401)
                .json({ success: false, error: "Invalid Token" });
        req.verifiedToken = { ...verified, token };
        return next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: "Invalid Token. Something Went Wrong. ",
        });
    }
}

async function verifyAdmin(req, res, next) {
    verifyToken(req, res, async () => {
        const { verifiedToken } = req;
        // console.log(verifiedToken, "verifiedToken");
        try {
            let user = null;
            if (verifiedToken.type !== "ADMIN")
                return res
                    .status(401)
                    .json({ success: false, error: "Access Denied" });
            const admin = await adminService.getAdminById(verifiedToken.id);
            // TODO : cache admin
            if (!admin || admin.status !== "ACTIVE" || !admin.isAdmin) {
                return res
                    .status(401)
                    .json({ success: false, error: "Unauthorized" });
            }
            user = admin;
            req.user = { ...user, id: user.id };
            return next();
        } catch (error) {
            return res
                .status(400)
                .json({ success: false, error: "Invalid Admin Token" });
        }
    });
}

async function verifyUser(req, res, next) {
    verifyToken(req, res, async () => {
        const { verifiedToken } = req;
        try {
            let user = null;
            if (verifiedToken.type !== "USER")
                return res
                    .status(401)
                    .json({ success: false, error: "Access Denied" });
            const userFromDB = await userService.getUserById(verifiedToken.id);
            if (!userFromDB || userFromDB.status !== "ACTIVE") {
                return res
                    .status(401)
                    .json({ success: false, error: "Unauthorized" });
            }
            user = userFromDB;

            req.user = { ...user };
            return next();
        } catch (error) {
            console.log(error, "error");
            return res
                .status(400)
                .json({ success: false, error: "Invalid Admin Token" });
        }
    });
}

const checkPermission = (requiredPermission) => (req, res, next) => {
    if (!req.user.isAdmin || !req.user.permission)
        return res
            .status(403)
            .json({ success: false, error: "Unauthorized Permission" });

    // const permissionFound = req.user.permission.find(
    //     (permissionItem) => permissionItem.slug === requiredPermission
    // );

    // if (!permissionFound) {
    //     return res
    //         .status(403)
    //         .json({ success: false, error: "Insufficient Permission" });
    // }
    // console.log(permissionFound, "permissionFound");

    if (!req.user.permission.includes(requiredPermission))
        return res
            .status(403)
            .json({ success: false, error: "Insufficient Permission" });
    const tempUser = { ...req.user };
    tempUser.permissionType = requiredPermission;
    req.user = tempUser;
    return next();
};

export default {
    verifyToken,
    verifyAdmin,
    checkPermission,
    verifyUser,
};
