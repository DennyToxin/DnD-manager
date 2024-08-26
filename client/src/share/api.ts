import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

const BaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api",
  prepareHeaders(headers, { getState }) {
    const token =
      (getState() as RootState).auth.user?.token ||
      localStorage.getItem("token");

    if (token && token !== null) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

const BaseQueryWithRetry = retry(BaseQuery, { maxRetries: 1 });

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: BaseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
