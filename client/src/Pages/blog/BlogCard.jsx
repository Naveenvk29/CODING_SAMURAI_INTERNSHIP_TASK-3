import { Link } from "react-router-dom";
const BlogCard = ({ data }) => {
  console.log(data.blogs.id);

  return (
    <div>
      {data?.blogs?.length ? (
        data?.blogs?.map((blog) => (
          <div key={blog._id} className="w-[300px] rounded-md border">
            <Link to={`/blogs/${blog._id}`}>
              <img
                src={blog.image}
                alt={blog.title}
                className="h-[200px] w-full rounded-md object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold">{blog.title}</h1>
                <p className="mt-3 text-sm text-gray-600">{blog.content}</p>
                <button
                  type="button"
                  className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Read more
                </button>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No blog found</p>
      )}
    </div>
  );
};

export default BlogCard;
