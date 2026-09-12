import { baseApi } from "../baseApi";
import type { StandStatsResponse } from "@/types/standStats";
import type { StandsApiResponse } from "@/types/standManagement";
import type { StandApiItem } from "@/types/standManagement";
import type { RootState } from "@/src/redux/store";
import type {
  ExhibitionDetailsResponse,
  UpdateExhibitionRequest,
} from "@/types/stand";

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
    getAdminExhibition: builder.query({
      query: () => ({
        url: "/admin/exhibition/latest-one",
        method: "GET",
      }),
      providesTags: ["Exhibition"],
    }),
    getAdminExhibitionDetails: builder.query<ExhibitionDetailsResponse, void>({
      query: () => ({
        url: "/admin/exhibition/latest-details",
        method: "GET",
      }),
      providesTags: ["Exhibition"],
    }),
    updateAdminExhibition: builder.mutation<
      ExhibitionDetailsResponse,
      UpdateExhibitionRequest
    >({
      query: (body) => ({
        url: "/admin/exhibition/latest-one",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Exhibition"],
    }),
    getStandStats: builder.query<StandStatsResponse, null>({
      query: () => ({
        url: "/admin/exhibition/stands/stats",
        method: "GET",
      }),
      providesTags: ["StandStats"],
    }),
    updateStandAvailability: builder.mutation<
      StandApiItem,
      { id: string; isAvailable: boolean }
    >({
      query: ({ id, isAvailable }) => ({
        url: `/admin/exhibition/stands/${id}/availability`,
        method: "PATCH",
        body: { isAvailable },
      }),
      // Only the small stats endpoint refetches in the background —
      // the stand list is updated optimistically in onQueryStarted,
      // so the table never shows a loading/reload state.
      invalidatesTags: ["StandStats"],
      async onQueryStarted(
        { id, isAvailable },
        { dispatch, getState, queryFulfilled },
      ) {
        const state = getState() as RootState;
        const cachedArgs = exhibitionApi.util.selectCachedArgsForQuery(
          state,
          "getAdminStands",
        );

        const standMatchesStatus = (
          stand: StandApiItem,
          status?: string,
        ): boolean => {
          if (!status) return true;
          const currentStatus = stand.isAvailable
            ? "available"
            : stand.bookingId
              ? "booked"
              : "unavailable";
          return currentStatus === status;
        };

        // Optimistically patch every cached stand list so the UI updates
        // instantly without any refetch.
        const patches = cachedArgs.map((args) =>
          dispatch(
            exhibitionApi.util.updateQueryData(
              "getAdminStands",
              args,
              (draft: StandsApiResponse) => {
                const index = draft.data.findIndex((s) => s.id === id);
                if (index === -1) return;
                const stand = draft.data[index];
                stand.isAvailable = isAvailable;

                // If the active filter no longer matches (e.g. blocking a
                // stand while filtering "Available"), remove the row from
                // the filtered view instead of leaving stale data.
                if (!standMatchesStatus(stand, args.status)) {
                  draft.data.splice(index, 1);
                  if (draft.metaData) {
                    draft.metaData.totalItems = Math.max(
                      0,
                      draft.metaData.totalItems - 1,
                    );
                    draft.metaData.itemCount = Math.max(
                      0,
                      draft.metaData.itemCount - 1,
                    );
                  }
                }
              },
            ),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          // Roll back optimistic updates if the request failed
          patches.forEach((patch) => patch.undo());
        }
      },
    }),
    getAdminStands: builder.query<
      StandsApiResponse,
      {
        hall?: string;
        category?: string;
        status?: string;
        page?: number;
        limit?: number;
      }
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.hall && params.hall !== "All Halls")
          searchParams.set("hall", params.hall);
        if (params.category && params.category !== "All Categories")
          searchParams.set("category", params.category);
        if (params.status && params.status !== "All Status")
          searchParams.set("status", params.status);
        if (params.page) searchParams.set("page", String(params.page));
        if (params.limit) searchParams.set("limit", String(params.limit));
        const queryString = searchParams.toString();
        return {
          url: `/admin/exhibition/stands${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Stand"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExhibitionMapQuery,
  useGetExhibitionStandQuery,
  useGetAdminExhibitionQuery,
  useGetAdminExhibitionDetailsQuery,
  useUpdateAdminExhibitionMutation,
  useGetStandStatsQuery,
  useGetAdminStandsQuery,
  useUpdateStandAvailabilityMutation,
} = exhibitionApi;
