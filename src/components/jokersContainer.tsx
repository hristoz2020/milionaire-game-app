import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import {
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
} from "../redux/slices/jokersSlice";
import { playFiftyFiftySound } from "../helpers/soundsCommands";
import { jokersList } from "../constants/jokerOptions";

const JokersContainer = () => {
	const dispatch = useAppDispatch();
	const { isVolumeActive } = useAppSelector(
		(state: RootState) => state.questions
	);
	const {
		isFiftyFiftyUsed,
		isFiftyFiftyClicked,
		isPhoneAFrendUsed,
		isAskTheAudienceUsed,
	} = useAppSelector((state: RootState) => state.jokers);

	const handleJokers = (joker: string) => {
		if (joker === "fiftyFifty") {
			if (isFiftyFiftyUsed) {
				return;
			}
			isVolumeActive && playFiftyFiftySound();
			setTimeout(() => {
				dispatch(setIsFiftyFiftyClicked(!isFiftyFiftyClicked));
				dispatch(setIsFiftyFiftyUsed(!isFiftyFiftyUsed));
			}, 1400);
		} else if (joker === "askTheAudience") {
			//add funcionality
			window.alert("This functionality is not added! :(");
		} else if (joker === "phoneAFrend") {
			//add functionality
			window.alert("This functionality is not added! :(");
		}
	};

	return (
		<div className="d-flex justify-content-center">
			{jokersList.map((joker) => {
				let toggleIcon = "";
				if (joker.option === "fiftyFifty") {
					toggleIcon = isFiftyFiftyUsed ? joker.imgUsed : joker.img;
				} else if (joker.option === "askTheAudience") {
					toggleIcon = isAskTheAudienceUsed
						? joker.imgUsed
						: joker.img;
				} else if (joker.option === "phoneAFrend") {
					toggleIcon = isPhoneAFrendUsed ? joker.imgUsed : joker.img;
				}

				return (
					<img
						src={toggleIcon}
						alt={joker.option}
						className={joker.className}
						key={joker.id}
						onClick={() => handleJokers(joker.option)}
					/>
				);
			})}
		</div>
	);
};

export default JokersContainer;
