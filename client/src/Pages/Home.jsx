import { useGetFeaturedPostsQuery } from "../redux/api/blogApi";
import banner from "../assets/banner.jpeg";
import BlogCard from "./blog/BlogCard";

const Home = () => {
  const { data, error, isLoading } = useGetFeaturedPostsQuery();

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero bg-cover bg-center h-[42.5rem] text-white flex flex-col justify-center items-center text-center z-0"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
        }}
      >
        <div className="w-full h-[70%] bg-gradient-to-b from-gray-800 to-black opacity-80 z-50 flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to My <span className="text-yellow-500"> Blog</span>
          </h1>
          <p className="text-lg mb-6">
            Hi, I'm Naveen Vinod Kumar. I write about technology, travel, anime,
            video editing, photography. Explore my latest articles and join the
            conversation!
          </p>
          <button className="bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-600">
            Read Our Latest Articles
          </button>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="latest-articles py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Latest Articles</h2>
          {isLoading && <p>Loading...</p>}
          {error && (
            <p className="text-red-500">Error occurred: {error.message}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.blogs?.length ? (
              data.blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
            ) : (
              <p className="text-gray-500 col-span-full">
                No articles available
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
