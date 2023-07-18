import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Question, Response_code } from "../../types/questionTypes";
import { BASE_URL } from "../../service/config";

interface QuestionState {
	questions: Question[];
	isLoading: boolean;
}

const initialState: QuestionState = {
	questions: [],
	isLoading: false,
};

export const getQuestions = createAsyncThunk("questions/get", async () => {
	const response = await fetch(BASE_URL, {
		method: "GET",
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: Response_code = await response.json();
	const questions: Question[] = data.results;
	return questions;
});

const questionSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getQuestions.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(
				getQuestions.fulfilled,
				(state, action: PayloadAction<Question[]>) => {
					state.questions = action.payload;
					state.isLoading = false;
				}
			)
			.addCase(getQuestions.rejected, (state) => {
				state.isLoading = true;
			});
	},
});

export default questionSlice.reducer;
