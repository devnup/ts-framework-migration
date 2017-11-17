export default class AsyncUtil {
    /**
     * Iterate asynchronously over an array of data, mapping in series.
     *
     * TODO: Handle parallel limitations optionally
     *
     * @param data The data to be mapped asynchronously
     * @param fn The iterator for the data, can be an async function
     */
    static mapSeries(data: any, fn: any): Promise<any>;
}
