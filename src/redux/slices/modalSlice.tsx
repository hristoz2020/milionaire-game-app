import { createSlice } from "@reduxjs/toolkit";

interface ShowModalState {
  isShow: boolean;
}

const initialState: ShowModalState = {
  isShow: false,
};

const modalSlice = createSlice({
  name: "isShow",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isShow = true;
    },
    hideModal: (state) => {
        state.isShow = false;
      },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
