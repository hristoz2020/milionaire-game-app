import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface scoreState {
  isShowScore: boolean;
}

const initialState: scoreState = {
  isShowScore: false,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    showScore: (state, action: PayloadAction<boolean>) => {
			state.isShowScore = action.payload;
    },
  },
});

export const { showScore } = scoreSlice.actions;
export default scoreSlice.reducer;
