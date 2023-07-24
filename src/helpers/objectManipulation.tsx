export const getKeyByValue = <T extends string>(
	obj: Record<T, string>,
	value: string
): T | null => {
	const foundKey = Object.keys(obj).find((key) => obj[key as T] === value) as
		| T
		| undefined;
	return foundKey ?? null;
};
