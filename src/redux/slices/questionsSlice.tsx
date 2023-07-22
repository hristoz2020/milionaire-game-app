import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Question, Response_code } from "../../types/questionTypes";
import { BASE_URL } from "../../services/config";

interface QuestionsState {
	responseQuestions: Response_code;
	questions: Question[];
	isLoading: boolean;
	currentQuestionIndex: number;
	selectedOption: string | null;
	isVisibleNexBtn: boolean;
	isVolumeActive: boolean;
}

const initialState: QuestionsState = {
	responseQuestions: { status: 0, results: [] },
	questions: [],
	isLoading: false,
	currentQuestionIndex: 0,
	selectedOption: null,
	isVisibleNexBtn: false,
	isVolumeActive: true,
};

export const getQuestions = createAsyncThunk("questions/get", async () => {
	const response = await fetch(BASE_URL, {
		method: "GET",
	});

	const data: Response_code = await response.json();

	return data.results;
});

const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		resetQuestions: (state) => {
			state.questions = [];
		},
		setCurrentQuestionIndex: (state) => {
			state.currentQuestionIndex = state.currentQuestionIndex + 1;
		},
		resetCurrentQuestionIndex: (state) => {
			state.currentQuestionIndex = 0;
		},
		setSelectedOption: (state, action: PayloadAction<string | null>) => {
			state.selectedOption = action.payload;
		},
		setIsVisibleNexBtn: (state, action: PayloadAction<boolean>) => {
			state.isVisibleNexBtn = action.payload;
		},
		setIsVolumeActive: (state, action: PayloadAction<boolean>) => {
			state.isVolumeActive = action.payload;
		},
	},
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

export const {
	resetQuestions,
	setCurrentQuestionIndex,
	resetCurrentQuestionIndex,
	setSelectedOption,
	setIsVisibleNexBtn,
	setIsVolumeActive,
} = questionsSlice.actions;
export default questionsSlice.reducer;
