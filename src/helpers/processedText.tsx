export const processedText = (text: string) => {
	return text
		?.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&amp;/g, "&")
		.replace(/&eacute;/g, "é")
		.replace(/&rsquo;/g, "`")
		.replace(/&shy;/g, "-")
		.replace(/&Uuml;/g, "ü")
		.replace(/&deg;/g, "°")
		.replace(/&ocirc;/g, "ô")
		.replace(/&oacute;/g, "ó")
};
