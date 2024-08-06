import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./authSlice";
const userApiBaseUrl: ImportMeta = import.meta.env.VITE_USER_API_BASE_URL;
interface ProfileData {
  userId: {
    avatar: {
      url: string;
    };
  };
}
// vite-env.d.ts
interface ImportMeta {
  env: {
    VITE_USER_API_BASE_URL: string;
  };
}
interface Login {
  email: string;
  password: string;
}
// console.log(userApiBaseUrl);
export const userApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${userApiBaseUrl}`,
    credentials: "include",
    prepareHeaders: (headers: Headers) => {
      const user = localStorage.getItem("userdata");

      if (user) {
        const userObject = JSON.parse(user);
        console.log(`user parse`, userObject);

        const token = userObject.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        console.log(`token available`, token);
      } else {
        console.log("No user data found in localStorage");
      }
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileData, void>({
      query: () => "/api/v1/user/me",
    }),
    addPost: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: "/api/v1/user/register",
        method: "POST",
        body: formData,
      }),
    }),
    loginRtk: builder.mutation<User, Login>({
      query: (data: Login) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: data,
      }),
    }),
    logoutRtk: builder.mutation<User, void>({
      query: () => ({
        url: "/api/v1/user/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useAddPostMutation,
  useLoginRtkMutation,
  useGetProfileQuery,
  useLogoutRtkMutation,
} = userApi;
