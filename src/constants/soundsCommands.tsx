import startSound from "../assets/sounds/start_game.mp3";
import wrongAnswerSound from "../assets/sounds/wrong_answer.mp3";

const gameSound = new Audio(startSound);
const answerSound = new Audio(wrongAnswerSound);

export const playGameSound = () => {
	void gameSound.play();
};

export const stopGameSound = () => {
	void gameSound.pause();
	gameSound.currentTime = 0;
};

export const playWrongAnswerSound = () => {
	void answerSound.play();
};

export const stopWrongAnswerSound = () => {
	void answerSound.pause();
	answerSound.currentTime = 0;
};
