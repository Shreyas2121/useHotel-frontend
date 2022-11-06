import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomsApi = createApi({
  reducerPath: "roomsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (build) => ({
    getRooms: build.query({
      query: () => "/rooms",
    }),

    checkAvailability: build.mutation({
      query: (data) => ({
        url: "/room/availability",
        method: "POST",
        body: data,
      }),
    }),

    getAddons: build.query({
      query: () => "/addons",
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useCheckAvailabilityMutation,
  useGetAddonsQuery,
} = roomsApi;
