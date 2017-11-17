import AsyncUtil from "../lib/util/AsyncUtil";

describe('lib.util.AsyncUtil', () => {

  it('should map an empty array successfully', async () => {
    let hasPassed = false;
    await AsyncUtil.mapSeries([], () => hasPassed = true);
    expect(hasPassed).toBe(false);
  });

  it('should map a valid array successfully', async () => {
    let counter = 0;
    await AsyncUtil.mapSeries([1, 2, 3], (i) => {
      // Ensure its in the right sequence
      if (i >= counter) {
        counter += i;
      }
    });
    expect(counter).toBe(6);
  });

  it('should handle a map error correctly', async () => {
    try {
      await AsyncUtil.mapSeries([1, 2, 3], (i) => { throw 'TestError' });
    } catch (error) {
      expect(error).toMatch(/TestError/);
    }
  });

});