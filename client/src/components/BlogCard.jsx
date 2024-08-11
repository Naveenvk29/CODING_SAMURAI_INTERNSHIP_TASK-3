import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded">
      <img
        src={blog.image || "path/to/default-image.jpg"} // Provide a default image if blog.image is not available
        alt={blog.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-xl font-semibold mt-4">{blog.title}</h3>
      <p className="text-gray-600 mt-2">{blog.description}</p>
      <Link
        to={`/blogs/${blog.id}`}
        className="text-blue-500 mt-4 inline-block"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
