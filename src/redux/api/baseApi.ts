/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/v1",
  credentials: "include",
  // হেডারে অতিরিক্ত তথ্য যোগ করার জন্য
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token; // Retrieve the token from the Redux store

    if (token) {
      headers.set("authorization", `${token}`); // Add the token to the Authorization header
    }
    return headers;
  },
});
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions); // Making the initial API request

  // If the response returns a 401 Unauthorized error
  if (result.error?.status === 401) {
    console.log("Sending RefreshToken");

    // Sending a request to refresh the token
    const res = await fetch("http://localhost:3000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    // If a new access token is received
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user; // Retrieving the user information from the Redux store

      // Dispatching the updated user and token to the Redux store
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken, // Setting the new access token
        })
      );
      // Retrying the original request with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["semester"],
  endpoints: () => ({}),
});
