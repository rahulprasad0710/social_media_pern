import logger from "../utils/logger.js";
// Connect to MongoDB
import connectDB from "../db/db.js";
// import seedData from "./data.seed.js";
import seedAdminToDB from "./admin.seed.js";
import seedCatgToDB from "./category.seed.js";

const seedFn = async () => {
    try {
        const response = await connectDB();
        if (response && response.connection && response.connection.host) {
            logger.info(`Mongo db connected: ${response.connection.host}`);
            // await seedData();
            await seedCatgToDB();
            process.exit(1);
        }
    } catch (error) {
        logger.error(`Error: ${error}`);
        process.exit(1);
    }
};

seedFn();
