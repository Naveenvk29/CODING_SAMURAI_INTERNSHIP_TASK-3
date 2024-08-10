import { useGetFeaturedPostsQuery } from "../../redux/api/blogApi";
import BlogCard from "./BlogCard";

const Allblogs = () => {
  const { data, error, isLoading } = useGetFeaturedPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred: {error.message}</p>;

  return (
    <div>
      <h1>All Blogs</h1>
      <BlogCard data={data} />
    </div>
  );
};

export default Allblogs;
