import { baseApi } from "../baseApi";

export const exhibitionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExhibitionMap: builder.query({
      query: () => ({
        url: "/exhibition/latest-one",
        method: "GET",
      }),
      providesTags: ["Exhibition", "Booking"],
    }),
    getExhibitionStand: builder.query({
      query: (standId) => ({
        url: `/exhibition/stand/${standId}`,
        method: "GET",
      }),
      providesTags: ["Stand"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetExhibitionMapQuery, useGetExhibitionStandQuery } = exhibitionApi;
