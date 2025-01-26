import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  products: {[id: string]: number};
};

const initialState: initialStateType = {
  products: {},
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{id: number, count: number}>) {
      state.products[action.payload.id] = action.payload.count;
    },
  },
});

export const { addToCart } = cartReducer.actions;
export default cartReducer.reducer;
