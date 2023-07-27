import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HelpersState {
	isFiftyFiftyClicked: boolean;
	isFiftyFiftyUsed: boolean;
	isAskTheAudienceClicked: boolean;
	isAskTheAudienceUsed: boolean;
	isCallAFrendClicked: boolean;
	isCallAFrendUsed: boolean;
}

const initialState: HelpersState = {
	isFiftyFiftyClicked: false,
	isFiftyFiftyUsed: false,
	isAskTheAudienceClicked: false,
	isAskTheAudienceUsed: false,
	isCallAFrendClicked: false,
	isCallAFrendUsed: false,
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
		setIsCallAFrendClicked: (state, action: PayloadAction<boolean>) => {
			state.isCallAFrendClicked = action.payload;
		},
		setIsCallAFrendUsed: (state, action: PayloadAction<boolean>) => {
			state.isCallAFrendUsed = action.payload;
		},
	},
});

export const {
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
	setIsAskTheAudienceClicked,
	setIsAskTheAudienceUsed,
	setIsCallAFrendClicked,
	setIsCallAFrendUsed,
} = jokersSlice.actions;
export default jokersSlice.reducer;
