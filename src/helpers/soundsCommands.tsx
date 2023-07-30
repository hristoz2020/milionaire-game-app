import start from "../assets/sounds/start_game.mp3";
import wrongAnswer from "../assets/sounds/wrong_answer.mp3";
import correctAnswer from "../assets/sounds/correct_answer.mp3";
import fiftyFifty from "../assets/sounds/fifty_fifty.mp3";
import askTheAudience from "../assets/sounds/ask_the_audience.mp3";

const gameSound = new Audio(start);
const wrongAnswerSound = new Audio(wrongAnswer);
const correctAnswerSound = new Audio(correctAnswer);
const fiftyFiftySound = new Audio(fiftyFifty);
const askTheAudienceSound = new Audio(askTheAudience);

export const playGameSound = () => {
	void gameSound.play();
};

export const stopGameSound = () => {
	void gameSound.pause();
	gameSound.currentTime = 0;
};

export const playWrongAnswerSound = () => {
	void wrongAnswerSound.play();
};

export const stopWrongAnswerSound = () => {
	void wrongAnswerSound.pause();
	wrongAnswerSound.currentTime = 0;
};

export const playCorrectAnswerSound = () => {
	void correctAnswerSound.play();
};

export const stopCorrectAnswerSound = () => {
	void correctAnswerSound.pause();
	correctAnswerSound.currentTime = 0;
};

export const playFiftyFiftySound = () => {
	void fiftyFiftySound.play();
};

export const playAskTheAudienceSound = () => {
	void askTheAudienceSound.play();
};
