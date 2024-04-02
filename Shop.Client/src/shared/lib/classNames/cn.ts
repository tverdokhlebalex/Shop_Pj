export function cn(
	cls: string,
	additional: Array<string | undefined> = []
): string {
	return [cls, ...additional.filter(Boolean)].join(' ');
}
