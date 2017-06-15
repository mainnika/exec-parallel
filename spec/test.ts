// tslint:disable:no-magic-numbers
import { execParallel } from '../index';

describe('Parallel', () => {

	it('should run COUNT times with LIMIT and exit properly', (done: DoneFn) => {

		const LIMIT: number = 10;
		const COUNT: number = 55;
		let i: number = 0;

		execParallel(LIMIT, async (): Promise<number> => {

			i++;

			if (i <= COUNT) {
				return i;
			}

			// tslint:disable-next-line:no-null-keyword
			return null;
		})
			.then((results: number[]) => {

				const sum: number = results.reduce((prev: number, current: number) => prev + current);

				expect(results.length).toEqual(COUNT);
				expect(sum).toEqual(((COUNT + 1) / 2) * COUNT);

				done();
			})
			.catch((e: Error) => done.fail(e));

	});
});
