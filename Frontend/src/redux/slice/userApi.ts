// services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Post {
  email: string;
  fullname: string;
  password: string;
  avatar: string;
  aboutMe: string;

  body: string;
}

export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/user" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    addPost: builder.mutation<Post, Post>({
      query: (register) => ({
        url: "/register",
        method: "POST",
        body: register,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = userApi;
