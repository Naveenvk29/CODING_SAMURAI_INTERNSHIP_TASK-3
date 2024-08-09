import Blog from "../Models/blog.model.js";
import { uploadImage, Deleteimage } from "../Utils/cloudinary.js";

// Create a new blog post
const createPost = async (req, res) => {
  try {
    const { title, content, description } = req.body;
    const author = req.user._id;

    const blog = new Blog({ title, content, description, author });

    // Handle image upload if an image is provided
    if (req.file) {
      const { url, public_id } = await uploadImage(req.file.path);
      blog.image = url;
      blog.imagePublicId = public_id; // Save public_id for deletion later
    }

    await blog.save();
    res.status(201).json({ message: "Blog post created successfully", blog });
  } catch (error) {
    console.error("Error creating blog post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an existing blog post and delete previous image if necessary
const uploadPost = async (req, res) => {
  try {
    const { title, content, description } = req.body;
    const author = req.user._id;

    // Find the existing blog post
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog)
      return res.status(404).json({ message: "Blog post not found" });

    // Delete the previous image if a new one is being uploaded
    if (req.files && req.files.length) {
      if (existingBlog.imagePublicId) {
        await Deleteimage(existingBlog.imagePublicId); // Delete the existing image from Cloudinary
      }

      // Upload new images to Cloudinary
      const images = await Promise.all(
        req.files.map(async (file) => {
          const { url, public_id } = await uploadImage(file.path);
          return { url, public_id };
        })
      );

      // Update blog with new image URLs and public IDs
      existingBlog.image = images.map((img) => img.url);
      existingBlog.imagePublicId = images.map((img) => img.public_id);
      console.log(imagesPublisId);
    }

    // Update other fields
    existingBlog.title = title;
    existingBlog.content = content;
    existingBlog.description = description;
    existingBlog.author = author;

    await existingBlog.save();
    res.json({ message: "Blog post updated successfully", blog: existingBlog });
  } catch (error) {
    console.error("Error updating blog post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a blog post
const deletePost = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog post not found" });

    // Delete the image from Cloudinary if it exists
    if (blog.imagePublicId) {
      await Deleteimage(blog.imagePublicId);
    }
    console.log(imagePublicId);

    await blog.delete();
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllPost = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "-password");
    res.json({ message: "All blog posts fetched successfully", blogs });
  } catch (error) {
    console.error("Error fetching all blog posts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "-password"
    );
    if (!blog) return res.status(404).json({ message: "Blog post not found" });
    res.json({ message: "Blog post fetched successfully", blog });
  } catch (error) {
    console.error("Error fetching blog post:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { createPost, getAllPost, getPostById, uploadPost, deletePost };
