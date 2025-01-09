import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/supabase-js";

type initialStateType = {
  authSession: Session | null;
};

const initialState: initialStateType = {
  authSession: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.authSession = action.payload;
    }
  },
});

export const { setSession } = authSlice.actions;
export default authSlice.reducer;
