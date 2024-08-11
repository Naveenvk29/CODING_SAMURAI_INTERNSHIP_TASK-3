import { useGetFeaturedPostsQuery } from "../../redux/api/blogApi";
import BlogCard from "./BlogCard";

const Allblogs = () => {
  const { data, error, isLoading } = useGetFeaturedPostsQuery();

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error occurred: {error.message}
      </p>
    );

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data?.blogs?.length ? (
          data.blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs available
          </p>
        )}
      </div>
    </div>
  );
};

export default Allblogs;
