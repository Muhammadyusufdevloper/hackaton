import { api } from './index'

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAdmins: build.query({
      query: (params) => ({
        url: '/api/admin/adminlar',
        params
      }),
      providesTags: ["Admin"]
    }),
    getAdminById: build.query({
      query: (id) => ({
        url: `/admin/${id}`,
      }),
      providesTags: ["Admin"]
    }),
    createAdmin: build.mutation({
      query: (body) => ({
        url: "/api/admin/signup",
        method: "POST",
        body
      }),
      invalidatesTags: ["Admin"]
    }),
    deleteAdmin: build.mutation({
      query: (id) => ({
        url: `/api/admin/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Admin"]
    }),
    updateAdmin: build.mutation({
      query: ({ id, body }) => ({
        url: `/admin/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Admin"]
    })
  }),
})

export const {
  useGetAdminsQuery,
  useGetAdminByIdQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
  useUpdateAdminMutation
} = adminApi
