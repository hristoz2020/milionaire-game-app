import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowModalState {
  isShow: boolean;
}

const initialState: ShowModalState = {
  isShow: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<boolean>) => {
			state.isShow = action.payload;
    },
  },
});

export const { showModal } = modalSlice.actions;
export default modalSlice.reducer;
