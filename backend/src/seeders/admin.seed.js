import Admin from "../models/admin.model.js";
import logger from "../utils/logger.js";
import { hashPassword } from "../functions/bcrypt.js";

// eslint-disable-next-line consistent-return
const seedAdminToDB = async () => {
    try {
        const admin = await Admin.findOne({ email: "superadmin123@gmail.com" });
        logger.info("Admin data already exists in DB");
        const password = await hashPassword("Superadmin123");
        console.log(password, "password");
        if (!admin) {
            const adminData = {
                firstName: "rahul",
                middleName: "",
                lastName: "prasad",
                email: "superadmin123@gmail.com",
                status: "ACTIVE",
                position: "SUPERADMIN",
                isAdmin: true,
                password,
                mobileNumber: 1234567890,
                permission: [
                    "DASHBOARD_VIEW",
                    "IMAGE_VIEW",
                    "IMAGE_UPLOAD",
                    "IMAGE_UPDATE",
                    "IMAGE_DELETE",
                    "FILE_UPLOAD",
                    "FILE_UPDATE",
                    "FILE_DELETE",
                    "CART_VIEW",
                    "WISHLIST_VIEW",
                    "REVIEW_VIEW",
                    "REVIEW_DELETE",
                    "AUDIT_VIEW",
                    "PRODUCT_VIEW",
                    "PRODUCT_CREATE",
                    "PRODUCT_UPDATE",
                    "PRODUCT_DELETE",
                    "CATEGORY_VIEW",
                    "CATEGORY_CREATE",
                    "CATEGORY_UPDATE",
                    "CATEGORY_DELETE",
                    "CATEGORY_STATUS_UPDATE",
                    "USER_VIEW",
                    "USER_EDIT",
                    "ADMIN_VIEW",
                    "ADMIN_ADD",
                    "ADMIN_DELETE",
                    "ADMIN_PERMISSION",
                    "ADMIN_APPROVE",
                    "ORDER_VIEW",
                    "ORDER_EDIT",
                    "ORDER_DELETE",
                    "ORDER_CREATE",
                ],
            };
            const savedAdmin = await Admin.create(adminData);

            console.log("Admin data added to DB", savedAdmin);
            logger.info("Admin data added to DB");
        }
    } catch (error) {
        console.log("Error in adding admin data to DB", error);
        logger.error("Error in adding admin data to DB", error);
    }
};

export default seedAdminToDB;
