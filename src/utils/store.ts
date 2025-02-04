import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/reducers/authReducer";
import { profileApi } from "@/src/services/profile";
import { setupListeners } from "@reduxjs/toolkit/query";
import { productApi } from "@/src/services/product";
import cartReducer from "@/src/reducers/cartReducer";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware, productApi.middleware),
});

setupListeners(appStore.dispatch);
