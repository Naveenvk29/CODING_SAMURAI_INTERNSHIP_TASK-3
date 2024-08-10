import { useParams, Link } from "react-router-dom";
import { useGetPostByIdQuery } from "../../redux/api/blogApi";
import dayjs from "dayjs";
import Loader from "../../components/Loader";

const PostDetails = () => {
  const { blogId } = useParams();

  const { data, isLoading } = useGetPostByIdQuery(blogId);

  if (isLoading) return <Loader />;
  if (!data || !data.blog)
    return <div className="text-center mt-4">No post found</div>;

  const postData = data.blog;
  const formattedDate = dayjs(postData.createdAt).format("DD/MM/YYYY");

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Post Details</h2>
        <Link to="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
      <hr className="w-full mb-4" />
      <div className="w-full max-w-4xl flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full mb-4">
          <img
            src={postData.image}
            alt={postData.title}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">{postData.title}</h1>
          <p className="text-gray-700 mb-4">{postData.description}</p>
          <hr className="my-4" />
          <p className="text-gray-600 mb-2">{postData.content}</p>
          <p className="text-gray-500 mb-1">
            Posted by: {postData.author.username}
          </p>
          <p className="text-gray-500">Published on: {formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
