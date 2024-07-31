import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Post = {
  email: string;
  fullName: string;
  password: string;
  avatar: string;
  aboutMe: string;
};
const userApiBaseUrl = import.meta.env.VITE_USER_API_BASE_URL;
// console.log(userApiBaseUrl);
export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${userApiBaseUrl}`,
  }),
  endpoints: (builder) => ({
    addPost: builder.mutation<Post[], FormData>({
      query: (formData) => ({
        url: "/register",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = userApi;
