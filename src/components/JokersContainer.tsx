import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import {
	setIsAskTheAudienceClicked,
	setIsCallAFrendClicked,
	setIsFiftyFiftyClicked,
	setIsFiftyFiftyUsed,
} from "../redux/slices/jokersSlice";
import { setIsShouldTimerStopped } from "../redux/slices/questionsSlice";
import CallAFrendModal from "./CallAFrendModal";
import { jokersList } from "../constants/jokerOptions";
import {
	playAskTheAudienceSound,
	playCallAFriendSound,
	playFiftyFiftySound,
	playGameSound,
	stopGameSound,
} from "../helpers/soundsCommands";

const JokersContainer = () => {
	const dispatch = useAppDispatch();
	const { isVolumeActive, isShouldTimerStopped } = useAppSelector(
		(state: RootState) => state.questions
	);
	const {
		isFiftyFiftyUsed,
		isFiftyFiftyClicked,
		isCallAFrendUsed,
		isCallAFrendClicked,
		isAskTheAudienceClicked,
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
			if (isAskTheAudienceClicked) {
				return;
			}
			!isShouldTimerStopped && dispatch(setIsShouldTimerStopped(!isShouldTimerStopped));
			isVolumeActive && stopGameSound();
			isVolumeActive && playAskTheAudienceSound();
			setTimeout(() => {
				dispatch(setIsAskTheAudienceClicked(!isAskTheAudienceClicked));
				isVolumeActive && playGameSound();
			}, 3000);
		}
		if (joker === "phoneAFrend") {
			if (isCallAFrendUsed) {
				return;
			}
			!isShouldTimerStopped && dispatch(setIsShouldTimerStopped(!isShouldTimerStopped));
			isVolumeActive && stopGameSound();
			isVolumeActive && playCallAFriendSound();
			setTimeout(() => {
				dispatch(setIsCallAFrendClicked(!isCallAFrendClicked));
				isVolumeActive && playGameSound();
			}, 4000);
		}
	};

	return (
		<div className="d-flex justify-content-center">
			<CallAFrendModal />
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
