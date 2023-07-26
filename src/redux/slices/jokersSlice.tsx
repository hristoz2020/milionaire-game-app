import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HelpersState {
	isFiftyFiftyClicked: boolean;
	isFiftyFiftyUsed: boolean;
}

const initialState: HelpersState = {
	isFiftyFiftyClicked: false,
	isFiftyFiftyUsed: false,
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
	},
});

export const { setIsFiftyFiftyClicked, setIsFiftyFiftyUsed } =
	jokersSlice.actions;
export default jokersSlice.reducer;
