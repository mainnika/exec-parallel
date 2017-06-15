'use strict';

export function execParallel<T>(limit: number, promise: (...args: {}[]) => Promise<T | null>): Promise<T[]> {

	let finished: boolean = false;

	return new Promise((resolve: (results?: T[]) => void, reject: (err?: {}) => void): void => {

		const results: T[] = [];

		function run(next: (result: T) => void): Promise<void> {

			return promise()
				.then(next)
				.catch(reject);
		}

		function runNext(result: T): Promise<void> | void {

			// tslint:disable-next-line:no-null-keyword
			if (result === null) {
				finished = true;

				return;
			}

			results.push(result);

			if (finished) {

				return;
			}

			return run(runNext);
		}

		Promise.all(Array
			.apply(undefined, { length: limit })
			.map(() => run(runNext)))
			.then(() => resolve(results))
			.catch(reject);
	});
}
