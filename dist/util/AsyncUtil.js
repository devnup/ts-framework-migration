"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("async");
class AsyncUtil {
    /**
     * Iterate asynchronously over an array of data, mapping in series.
     *
     * TODO: Handle parallel limitations optionally
     *
     * @param data The data to be mapped asynchronously
     * @param fn The iterator for the data, can be an async function
     */
    static mapSeries(data, fn) {
        return new Promise((resolve, reject) => async_1.mapSeries(data, async_1.asyncify(fn), (error, results) => {
            error ? reject(error) : resolve(results);
        }));
    }
}
exports.default = AsyncUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXN5bmNVdGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL3V0aWwvQXN5bmNVdGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTRDO0FBRTVDO0lBRUU7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBUyxFQUFFLEVBQU87UUFDakMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsaUJBQVMsQ0FBQyxJQUFJLEVBQUUsZ0JBQVEsQ0FBQyxFQUFFLENBQVEsRUFBRSxDQUFDLEtBQVksRUFBRSxPQUFZLEVBQUUsRUFBRTtZQUMxRyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0Y7QUFmRCw0QkFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFzeW5jaWZ5LCBtYXBTZXJpZXMgfSBmcm9tICdhc3luYyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzeW5jVXRpbCB7XG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgYXN5bmNocm9ub3VzbHkgb3ZlciBhbiBhcnJheSBvZiBkYXRhLCBtYXBwaW5nIGluIHNlcmllcy5cbiAgICogXG4gICAqIFRPRE86IEhhbmRsZSBwYXJhbGxlbCBsaW1pdGF0aW9ucyBvcHRpb25hbGx5XG4gICAqIFxuICAgKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBiZSBtYXBwZWQgYXN5bmNocm9ub3VzbHlcbiAgICogQHBhcmFtIGZuIFRoZSBpdGVyYXRvciBmb3IgdGhlIGRhdGEsIGNhbiBiZSBhbiBhc3luYyBmdW5jdGlvblxuICAgKi9cbiAgc3RhdGljIG1hcFNlcmllcyhkYXRhOiBhbnksIGZuOiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBtYXBTZXJpZXMoZGF0YSwgYXN5bmNpZnkoZm4pIGFzIGFueSwgKGVycm9yOiBFcnJvciwgcmVzdWx0czogYW55KSA9PiB7XG4gICAgICBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKHJlc3VsdHMpO1xuICAgIH0pKTtcbiAgfVxufVxuIl19