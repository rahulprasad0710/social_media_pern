import multer, { memoryStorage } from "multer";
import path from "path";
import fs from "fs";

const storage = memoryStorage();

const storageArray = multer.diskStorage({
    destination(req, file, cb) {
        const folderPath = path.join(
            process.cwd(),
            "",
            "public",
            "uploads",
            "temp"
        );

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        cb(null, folderPath);
    },

    filename(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname.replace(/\s/g, "")}`);
    },
});

export const uploadBigFile = multer({
    storage,
    dest: "../../public/uploads",
});

export const uploadFile = multer({
    storage: storageArray,
});
