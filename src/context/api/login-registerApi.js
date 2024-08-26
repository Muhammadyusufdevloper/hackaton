import { api } from './index'

export const loginRegisterApi = api.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => ({
        url: "/api/admin/login",
        method: "POST",
        body
      }),
      invalidatesTags: ["Admin", "Car", "Employee", "Profile"]
    }),
    register: build.mutation({
      query: (body) => ({
        url: "/admins/sign-up",
        method: "POST",
        body
      }),
      invalidatesTags: ["Product", "Category", "Profile"]
    }),
  }),
})

export const {
  useRegisterMutation,
  useSignInMutation
} = loginRegisterApi