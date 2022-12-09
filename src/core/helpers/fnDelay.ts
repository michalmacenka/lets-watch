const initDelay = (ms: number) => {
	let timer = 0;
	return (callback: Function) => {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
};
export { initDelay };
