import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HelpersState {
	isFiftyFiftyClicked: boolean;
}

const initialState: HelpersState = {
	isFiftyFiftyClicked: false,
};

const helpersSlice = createSlice({
	name: "helpers",
	initialState,
	reducers: {
		setIsFiftyFiftyClicked: (state, action: PayloadAction<boolean>) => {
			state.isFiftyFiftyClicked = action.payload;
		},
	},
});

export const { setIsFiftyFiftyClicked } = helpersSlice.actions;
export default helpersSlice.reducer;
