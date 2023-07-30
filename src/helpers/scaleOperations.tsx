export const generateFourNumbers = () => {
	const num1 = Math.floor(Math.random() * 100) + 10;
	const num2 = Math.floor(Math.random() * 100) + 10;
	const num3 = Math.floor(Math.random() * 100) + 10;
	const num4 = 400 - (num1 + num2 + num3);

	return [num1, num2, num3, num4];
};
