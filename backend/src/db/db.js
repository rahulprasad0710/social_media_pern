/* eslint-disable no-console */
import mongoose from "mongoose";
import configSetting from "../config/index.js";
import logger from "../utils/logger.js";

const { DB_URL } = configSetting;

// eslint-disable-next-line consistent-return
const connectDB = async () => {
    try {
        const response = await mongoose.connect(DB_URL);

        console.log(`Mongo db connected: ${response.connection.host}`);
        return response;
    } catch (error) {
        logger.error("DB NOT CONNECTED", error);
        console.log("DB NOT CONNECTED", error);
        process.exit(1);
    }
};
export default connectDB;
