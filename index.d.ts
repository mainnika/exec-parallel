export declare function execParallel<T>(limit: number, promise: (...args: {}[]) => Promise<T | null>): Promise<T[]>;
