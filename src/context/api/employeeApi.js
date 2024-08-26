import { api } from './index'

export const employeeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getEmployees: build.query({
      query: (params) => ({
        url: '/api/hodim/hodimlar',
        params
      }),
      providesTags: ["Employee"]
    }),
    getEmployeeById: build.query({
      query: (id) => ({
        url: `/employee/${id}`,
      }),
      providesTags: ["Employee"]
    }),
    createEmployee: build.mutation({
      query: (body) => ({
        url: "/api/hodim/signup",
        method: "POST",
        body
      }),
      invalidatesTags: ["Employee"]
    }),
    deleteEmployee: build.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Employee"]
    }),
    updateEmployee: build.mutation({
      query: ({ id, body }) => ({
        url: `/employee/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Employee"]
    })
  }),
})

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation
} = employeeApi
