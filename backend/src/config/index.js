import dotenv from "dotenv";

dotenv.config();

const configSetting = {
    port: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URL: process.env.DB_URL,
    COLLECTION_CONFIG: process.env.COLLECTION_CONFIG,
    BASE_URL: process.env.BASE_URL,
    ADDADMIN: process.env.ADDADMIN,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

export default configSetting;
