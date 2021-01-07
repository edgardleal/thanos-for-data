/**
 * index.test.ts
 *
 * @module index.test.ts
 */

import thanos, { shuffleList } from './index';

describe('thanos', () => {
  describe('shuffleList', () => {
    it('should return a list', () => {
      const result = shuffleList([]);
      expect(result).toHaveLength(0);
    });
  });
  describe('thanos', () => {
    it('the object should result with half of fields', () => {
      const obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      };
      thanos(obj);

      const keys = Object.keys(obj);
      expect(keys).toHaveLength(2);
    });
  });
});
