import { IPost, IPostState } from "@/interfaces/post";
import { createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const initialState: IPostState = {
  postsState: [],
  loading: false,
  showModal: false
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setListPostsState: (state:any, action: PayloadAction<IPost[]>) => {
      state.loading = true;
      state.postsState = [...action.payload];
      state.loading = false;
    },
    setShowModalPostState: (state) => {
      state.showModal= !state.showModal;
    },
  },
});

export const { setListPostsState, setShowModalPostState } = postSlice.actions;
export const postReducer = postSlice.reducer;
