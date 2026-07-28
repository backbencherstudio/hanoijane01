import { baseApi } from "../baseApi";

export const exhibitionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.query({
      query: () => ({
        url: "/exhibition/latest-one",
        method: "GET",
      }),
    }),
  }),

  overrideExisting: false,
});

export const {} = exhibitionApi;
