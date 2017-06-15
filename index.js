'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function execParallel(limit, promise) {
    let finished = false;
    return new Promise((resolve, reject) => {
        const results = [];
        function run(next) {
            return promise()
                .then(next)
                .catch(reject);
        }
        function runNext(result) {
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
exports.execParallel = execParallel;
//# sourceMappingURL=index.js.map