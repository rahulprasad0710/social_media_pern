import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import dbConnect from "./db/db.js";
import logger from "./utils/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";
// import viewRoute from "./controllers/views.controller.js";
import swaggerConfig from "./config/swaggerConfig.js";

const app = express();

dotenv.config();

// db connection
await dbConnect().catch((error) => {
    logger.error(error);
    process.exit(1);
});

// middlewares
morgan.token("customDate", () => {
    const currentDate = new Date().toISOString();
    return currentDate;
});
const logFormat = ":customDate :method :url :status :res[content-length]";
app.use(morgan(logFormat));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(express.static("public"));
// routes
app.use("/api", routes);

// static files

if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(process.cwd(), "", "public");
    app.use(express.static(staticPath));
    app.use("/home", (req, res) =>
        res
            .status(200)
            .json({ success: true, message: "Welcome to the home page ." })
    );
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(staticPath, "index.html"))
    );
}

app.use("/home", (req, res) =>
    res
        .status(200)
        .json({ success: true, message: "Welcome to the home page dev" })
);

app.all("*", (req, res, _next) => {
    res.status(404).json({
        success: false,
        data: null,
        message: "API Not Found",
    });
});

app.use(errorHandler);

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on port ${port}`);
});
