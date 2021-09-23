import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const eventsApi = createApi({
	reducerPath: "EVENTS",
	keepUnusedDataFor: 5,
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.REACT_APP_API_DOMAIN + "/events",
	}),

	endpoints: (builder) => ({
		getEvents: builder.query({
			query: (offset = 0) => `/?offset=${offset * 10}`,
			keepUnusedDataFor: 60,
		}),
		removeEvent: builder.mutation({
			query: (id) => ({ url: `/${id}`, method: "delete" }),
		}),
		createEvent: builder.mutation({
			query: (data) => ({
				url: "/",
				method: "post",
				body: data,
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});
export const {
	useGetEventsQuery,
	useCreateEventMutation,
	useRemoveEventMutation,
} = eventsApi;
