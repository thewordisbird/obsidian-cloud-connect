function wait(delay: number): Promise<void> {
	return new Promise((res, _rej) => {
		setTimeout(() => {
			res();
		}, delay);
	});
}

export function exponentialBackoff<I, R, S>(args: {
	func: (args: I) => Promise<R | S>;
	checkFunc: (args: R | S) => boolean;
	interval: number;
	maxRetry: number;
	growthFactor: number;
}) {
	const { func, checkFunc, interval, maxRetry, growthFactor } = args;

	return async function (args: I) {
		let attempts = 0;
		let delay = interval * Math.pow(growthFactor, attempts);

		while (attempts <= maxRetry) {
			try {
				let result = await func(args);
				if (checkFunc(result)) {
					console.log("Exponential Backoff Result:", result);
					return result as S;
				}
			} catch (e) {
				// TODO: Error handling
				console.error(e);
			} finally {
				attempts++;
				delay = interval * Math.pow(growthFactor, attempts);
				await wait(delay);
			}
		}

		throw new Error(`Exponential Backoff Error: Maximum retries exceeded`);
	};
}
