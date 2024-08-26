import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "./slices/authSlice";
import wishlistSlice from "./slices/wishlistSlice";
import cartSlice from "./slices/cartSlice";
import adminMenuSlice from "./slices/adminMenu";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    wishlist: wishlistSlice,
    cart: cartSlice,
    adminMenu: adminMenuSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});