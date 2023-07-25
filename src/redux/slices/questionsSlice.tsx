import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Question, Response_code } from "../../types/questionTypes";
import {
	BASE_URL,
	CATEGORY,
	DIFFICULTY,
	TYPE_ANSWERS,
} from "../../services/config";
import { categoriesTypes } from "../../constants/selectedOptions";
import { getKeyByValue } from "../../helpers/objectManipulation";

interface QuestionsState {
	responseQuestions: Response_code;
	questions: Question[];
	isLoading: boolean;
	currentQuestionIndex: number;
	selectedOption: string | null;
	isVisibleNexBtn: boolean;
	isVolumeActive: boolean;
	questionsCategory: string;
	questionsDifficulty: string;
	isShouldTimerStopped: boolean;
	isDisabledAnswersBtns: boolean;
}

const initialState: QuestionsState = {
	responseQuestions: { status: 0, results: [] },
	questions: [],
	isLoading: false,
	currentQuestionIndex: 0,
	selectedOption: null,
	isVisibleNexBtn: false,
	isVolumeActive: true,
	questionsCategory: "Any Category",
	questionsDifficulty: "Easy",
	isShouldTimerStopped: false,
	isDisabledAnswersBtns: false,
};

export const getQuestions = createAsyncThunk(
	"questions/get",
	async ({
		category,
		difficulty,
	}: {
		category: string;
		difficulty: string;
	}) => {
		let categoryPath = "";
		if (category !== "Any Category") {
			const categoryString = String(category);
			const foundCategory = getKeyByValue(
				categoriesTypes,
				categoryString
			);
			foundCategory !== null
				? (categoryPath = `${CATEGORY}${foundCategory}`)
				: (categoryPath = "");
		}

		const response = await fetch(
			`${BASE_URL}${categoryPath}${DIFFICULTY}${difficulty.toLocaleLowerCase()}${TYPE_ANSWERS}`,
			{
				method: "GET",
			}
		);

		const data: Response_code = await response.json();

		return data.results;
	}
);

const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		setCurrentQuestionIndex: (state) => {
			state.currentQuestionIndex = state.currentQuestionIndex + 1;
		},
		resetCurrentQuestionIndex: (state) => {
			state.currentQuestionIndex = 0;
		},
		setSelectedOption: (state, action: PayloadAction<string | null>) => {
			state.selectedOption = action.payload;
		},
		setIsNextBtnVisible: (state, action: PayloadAction<boolean>) => {
			state.isVisibleNexBtn = action.payload;
		},
		setIsVolumeActive: (state, action: PayloadAction<boolean>) => {
			state.isVolumeActive = action.payload;
		},
		setQuestionsCategory: (state, action: PayloadAction<string>) => {
			state.questionsCategory = action.payload;
		},
		setQuestionsDifficulty: (state, action: PayloadAction<string>) => {
			state.questionsDifficulty = action.payload;
		},
		setIsShouldTimerStopped: (state, action: PayloadAction<boolean>) => {
			state.isShouldTimerStopped = action.payload;
		},
		setIsDisabledAnswersBtns: (state, action: PayloadAction<boolean>) => {
			state.isDisabledAnswersBtns = action.payload;
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
	setCurrentQuestionIndex,
	resetCurrentQuestionIndex,
	setSelectedOption,
	setIsNextBtnVisible,
	setIsVolumeActive,
	setQuestionsCategory,
	setQuestionsDifficulty,
	setIsShouldTimerStopped,
	setIsDisabledAnswersBtns,
} = questionsSlice.actions;
export default questionsSlice.reducer;
