import { Link } from "react-router-dom";
const BlogCard = ({ blog }) => {
  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div key={blog._id} className="w-[400px] rounded-md border">
        <Link to={`/blogs/${blog._id}`}>
          <img
            src={blog.image}
            alt={blog.title}
            className="h-[300px] w-full rounded-md object-cover"
          />
          <div className="p-4">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="mt-3 text-sm text-gray-600">{blog.content}</p>
            <button
              type="button"
              className="mt-4 rounded-sm bg-black px-5 py-3 text-m font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Read more
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
