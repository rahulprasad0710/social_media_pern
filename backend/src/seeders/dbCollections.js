import mongoose from "mongoose";
import configSetting from "../config/index.js";
import logger from "../utils/logger.js";
// Connect to MongoDB
import connectDB from "../db/db.js";

const dropDBFn = async () => {
    try {
        const response = await connectDB();
        if (response && response.connection && response.connection.host) {
            logger.info(`Mongo db connected: ${response.connection.host}`);
            const accessCode = process.argv[2];
            const { COLLECTION_CONFIG } = configSetting;

            if (accessCode !== COLLECTION_CONFIG) {
                console.log("Invalid access code");
                logger.error(
                    `Invalid access code : ${configSetting.COLLECTION_CONFIG}`
                );
                return;
            }
            const collections = await mongoose.connection.db
                .listCollections()
                .toArray();

            // eslint-disable-next-line no-restricted-syntax
            // for (const collection of collections) {
            //     try {
            //         const reponse = await mongoose.connection.db.dropCollection(
            //             collection.name
            //         );
            //         logger.info(`Collection dropped: ${reponse}`);
            //     } catch (error) {
            //         console.log(error.message)
            //     }
            // }

            Promise.all(
                collections.map(async (c) => {
                    try {
                        const reposne =
                            await mongoose.connection.db.dropCollection(c.name);
                        console.log(reposne);
                        logger.info(`Collection dropped: ${reposne}`);
                        return reposne;
                    } catch (error) {
                        logger.error(`Error: ${error}`);
                        return error;
                    }
                })
            );

            // close the database connection
            await mongoose.connection.close();
            process.exit(1);
        }
    } catch (error) {
        console.log(error.message);
        logger.error(`Error: ${error}`);
        process.exit(1);
    }
};

dropDBFn();
