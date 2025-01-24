const calculeAge = (date: Date | string) => {
	const today = new Date();
	const nasc = new Date(date);

	const result = today.getTime() - nasc.getTime();

	return Math.floor(result / (1000 * 60 * 60 * 24) / 365);
};



export default calculeAge;
