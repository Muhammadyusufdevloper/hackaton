import { api } from './index'

export const profileApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: (params) => ({
        url: '/admin/profile',
        params
      }),
      providesTags: ["Profile"]
    }),
    updateProfile: build.mutation({
      query: ({ body }) => ({
        url: `/admin/profile`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Profile"]
    })
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation
} = profileApi