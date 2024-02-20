import multer, { memoryStorage } from "multer";
import { BigFileData } from "../models/File.model";
const storage = memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("chunk"), async (req, res) => {
    const { filename, filetype, fileSize, currentChunk, totalChunks } =
        req.body;
    const { buffer } = req.file;

    try {
        let bigFileData = await BigFileData.findOne({ filename });

        if (!bigFileData) {
            bigFileData = new BigFileData({
                filename,
                filetype,
                fileSize,
                chunks: [],
            });
        }

        bigFileData.chunks[currentChunk] = {
            index: currentChunk,
            data: buffer,
        };

        const progress =
            bigFileData.chunks.filter((chunk) => !!chunk).length / totalChunks;

        if (progress === 1) {
            const finalData = Buffer.concat(
                bigFileData.chunks.map((chunk) => chunk.data),
                bigFileData.fileSize
            );
            bigFileData.chunks = [];
            bigFileData.save();

            // Handle the final data as needed (e.g., save it to disk, stream it to another API, etc.)
            console.log(`Video ${filename} uploaded successfully!`);
        } else {
            bigFileData.save();
        }

        res.json({ success: true, progress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});
