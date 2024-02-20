import fs from "fs";
import path from "path";

const moveFile = (oldPath, newPath) => {
    const folderPath = path.dirname(newPath);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
    fs.renameSync(oldPath, newPath);
};

export default moveFile;
