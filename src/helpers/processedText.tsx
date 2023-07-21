export const processedText = (text: string) => {
	return text
		?.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&amp;/, "&")
		.replace(/&eacute;/, "é")
        .replace(/&rsquo;/, "`");
};
