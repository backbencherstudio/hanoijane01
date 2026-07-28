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
  }),

  overrideExisting: false,
});

export const { useGetExhibitionMapQuery } = exhibitionApi;
