import cloudinary from "./cloudinaryConfig.js";
import fs from "fs";

const uploadImage = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "Blog_images",
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath); // Delete local file after upload
    return { url: result.secure_url, public_id: result.public_id }; // Return both the URL and public_id
  } catch (error) {
    console.error("Error uploading image:", error.message);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Delete local file in case of error
    }
    throw error;
  }
};

const Deleteimage = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted successfully:", publicId);
  } catch (error) {
    console.error("Error deleting image:", error.message);
    throw error;
  }
};

export { uploadImage, Deleteimage };
