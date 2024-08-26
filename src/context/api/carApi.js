import { api } from './index'

export const carApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCars: build.query({
      query: (params) => ({
        url: '/api/car/all',
        params
      }),
      providesTags: ["Car"]
    }),
    getCarById: build.query({
      query: (id) => ({
        url: `/car/${id}`,
      }),
      providesTags: ["Car"]
    }),
    createCar: build.mutation({
      query: (body) => ({
        url: "/api/car/create",
        method: "POST",
        body
      }),
      invalidatesTags: ["Car"]
    }),
    deleteCar: build.mutation({
      query: (id) => ({
        url: `/car/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Car"]
    }),
    updateCar: build.mutation({
      query: ({ id, body }) => ({
        url: `/car/${id}`,
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Car"]
    })
  }),
})

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useDeleteCarMutation,
  useUpdateCarMutation
} = carApi
