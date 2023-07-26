import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HelpersState {
	isFiftyFiftyClicked: boolean;
	isFiftyFiftyUsed: boolean;
	isAskTheAudienceClicked: boolean;
	isAskTheAudienceUsed: boolean;
	isPhoneAFrendClicked: boolean;
	isPhoneAFrendUsed: boolean;
}

const initialState: HelpersState = {
	isFiftyFiftyClicked: false,
	isFiftyFiftyUsed: false,
	isAskTheAudienceClicked: false,
	isAskTheAudienceUsed: false,
	isPhoneAFrendClicked: false,
	isPhoneAFrendUsed: false,
};

const jokersSlice = createSlice({
	name: "helpers",
	initialState,
	reducers: {
		setIsFiftyFiftyClicked: (state, action: PayloadAction<boolean>) => {
			state.isFiftyFiftyClicked = action.payload;
		},
		setIsFiftyFiftyUsed: (state, action: PayloadAction<boolean>) => {
			state.isFiftyFiftyUsed = action.payload;
		},
		setIsAskTheAudienceClicked: (state, action: PayloadAction<boolean>) => {
			state.isAskTheAudienceClicked = action.payload;
		},
		setIsAskTheAudienceUsed: (state, action: PayloadAction<boolean>) => {
			state.isAskTheAudienceUsed = action.payload;
		},
		setIsPhoneAFrendClicked: (state, action: PayloadAction<boolean>) => {
			state.isFiftyFiftyClicked = action.payload;
		},
		setIsPhoneAFrendUsed: (state, action: PayloadAction<boolean>) => {
			state.isPhoneAFrendUsed = action.payload;
		},
	},
});

export const {
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
	setIsAskTheAudienceClicked,
	setIsAskTheAudienceUsed,
	setIsPhoneAFrendClicked,
	setIsPhoneAFrendUsed,
} = jokersSlice.actions;
export default jokersSlice.reducer;
