import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "../config/cloudinary.js";

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
});

async function CloudinaryUpload(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Upload failed:", error);

        return error;
    }
}

cloudinary.image("samples/shoe.jpg", { height: 300, width: 500, crop: "fill" });

cloudinary.image("samples/smile.jpg", {
    transformation: [
        { gravity: "face", height: 300, width: 300, crop: "fill" },
        { fetch_format: "png" },
        { radius: "max" },
    ],
});

cloudinary.image("samples/balloons.jpg", {
    height: 530,
    width: 700,
    crop: "scale",
});

export default CloudinaryUpload;
