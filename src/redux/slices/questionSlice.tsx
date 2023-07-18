import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Question } from "../../types/questionTypes";
import { BASE_URL } from "../../service/config";

interface QuestionState {
	question: Question[];
	isLoading: boolean;
}

const initialState: QuestionState = {
	question: [],
	isLoading: false,
};

export const getQuestions = createAsyncThunk(
	"questions/get",
	async () => {
		const response = await fetch(BASE_URL, {
			method: "GET",
		});
		const data = await response.json();
		return data.results;
	}
);

const questionSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(getQuestions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getQuestions.fulfilled, (state, action) => {
				state.question = action.payload;
			  })
			  
			.addCase(getQuestions.rejected, (state) => {
				state.isLoading = false;
			});
	},
});

export default questionSlice.reducer;
