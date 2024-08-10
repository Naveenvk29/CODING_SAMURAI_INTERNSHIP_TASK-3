import { apiSlice } from "./apiSlice";
import { POST_URL } from "../constant";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (id) => ({
        url: `${POST_URL}/blog/${id}`,
      }),
    }),
    createPost: builder.mutation({
      query: (post) => ({
        url: POST_URL,
        method: "POST",
        body: post,
      }),
    }),
    updatePost: builder.mutation({
      query: (post) => ({
        url: `${POST_URL}/${post._id}`,
        method: "PUT",
        body: post,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `${POST_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getFeaturedPosts: builder.query({
      query: () => ({
        url: `${POST_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetFeaturedPostsQuery,
} = blogApi;
