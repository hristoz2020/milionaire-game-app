import { createSlice } from "@reduxjs/toolkit";

interface QuestionState {
  points: number;
}

const initialState: QuestionState = {
  points: 0,
};

const pointsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addPoint: (state) => {
      state.points += 1;
    },
    resetPoints: (state) => {
      state.points = 0;
    },
  },
});

export const { addPoint, resetPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
