import { IAuthState, IUser } from "@/interfaces/auth";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IAuthState = {
  user: {
    createdAt: new Date(),
    email: '',
    firstname: '',
    id: '',
    lastname: '',
    password: '',
    role: '',
    updatedAt: new Date(),
  },
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDataState: (state, action: PayloadAction<IUser>) => {
      state.user = {...action.payload};
      localStorage.setItem('user', String(state.user));
    },
  },
});

export const { setUserDataState } = authSlice.actions;
export const authReducer = authSlice.reducer;