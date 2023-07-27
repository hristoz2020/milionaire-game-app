import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import {
	setIsCallAFrendClicked,
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
} from "../redux/slices/jokersSlice";
import { playFiftyFiftySound } from "../helpers/soundsCommands";
import { jokersList } from "../constants/jokerOptions";
import PhoneAFrendModal from "./phoneAFrendModal";

const JokersContainer = () => {
	const dispatch = useAppDispatch();
	const { isVolumeActive } = useAppSelector(
		(state: RootState) => state.questions
	);
	const {
		isFiftyFiftyUsed,
		isFiftyFiftyClicked,
		isCallAFrendUsed,
		isCallAFrendClicked,
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
		}
		if (joker === "askTheAudience") {
			//add funcionality
			window.alert("This functionality is not added! :(");
		}
		if (joker === "phoneAFrend") {
			if (isCallAFrendUsed) {
				return;
			}
			setTimeout(() => {
				dispatch(setIsCallAFrendClicked(!isCallAFrendClicked));
			}, 1000);
		}
	};

	return (
		<div className="d-flex justify-content-center">
			<PhoneAFrendModal />
			{jokersList.map((joker) => {
				let toggleIcon = "";
				if (joker.option === "fiftyFifty") {
					toggleIcon = isFiftyFiftyUsed ? joker.imgUsed : joker.img;
				} else if (joker.option === "askTheAudience") {
					toggleIcon = isAskTheAudienceUsed
						? joker.imgUsed
						: joker.img;
				} else if (joker.option === "phoneAFrend") {
					toggleIcon = isCallAFrendUsed ? joker.imgUsed : joker.img;
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
