import { apiSlice } from "./apiSlice";
import { MESSAGES_URL } from "../constant";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: `${MESSAGES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getMessages: builder.query({
      query: () => ({
        url: `${MESSAGES_URL}`,
        method: "GET",
      }),
    }),
    getMessagesById: builder.query({
      query: (id) => ({
        url: `${MESSAGES_URL}/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSendMessageMutation,
  useGetMessagesQuery,
  useGetMessagesByIdQuery,
} = messagesApi;
