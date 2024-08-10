import { apiSlice } from "./apiSlice";
import { COMMENT_URL } from "../constant";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      url: COMMENT_URL,
      transformResponse: (response) => response.data,
    }),
    getcommentById: builder.query({
      url: (id) => `${COMMENT_URL}/${id}`,
      transformResponse: (response) => response.data,
    }),
    createComment: builder.mutation({
      url: COMMENT_URL,
      method: "POST",
      transformResponse: (response) => response.data,
    }),
    deleteComment: builder.mutation({
      url: (id) => `${COMMENT_URL}/${id}`,
      method: "DELETE",
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByIdQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
