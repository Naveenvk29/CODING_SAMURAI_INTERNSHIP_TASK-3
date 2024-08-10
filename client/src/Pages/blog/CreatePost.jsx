import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePostMutation } from "../../redux/api/blogApi";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import login from "../Auth/Login";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [createPost, { isLoading, error }] = useCreatePostMutation();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !description || !image) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("description", description);
    formData.append("image", image);
    console.log(formData);

    try {
      await createPost(formData).unwrap();
      toast.success("Blog post created successfully!");
      navigate("/my-blogs");
    } catch (err) {
      toast.error(err.data?.message || "Failed to create blog post");
    }
  };

  return (
    <div className="flex w-screen flex-col items-center mt-5">
      <div className="text-2xl font-bold underline mb-4">
        <h2>write Blogs</h2>
      </div>
      <form
        className="border border-gray-300 p-6 rounded-lg shadow-lg flex flex-col w-full max-w-md"
        onSubmit={handlesubmit}
      >
        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <label className="font-medium text-gray-700">Title:</label>
          <input
            className="p-2 border border-gray-300 rounded-lg"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <label className="font-medium text-gray-700">Content:</label>
          <textarea
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <label className="font-medium text-gray-700">Description:</label>
          <textarea
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
        >
          {isLoading ? <Loader /> : "Create Post"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
      {isLoading && <Loader />}
    </div>
  );
};

export default CreatePost;
