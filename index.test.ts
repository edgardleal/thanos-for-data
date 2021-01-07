/**
 * index.test.ts
 *
 * @module index.test.ts
 */

import thanos, { shuffleList, isArray } from './index';

describe('isArray', () => {
  it('when receive null, should return false ', () => {
    expect(isArray(null)).toBeFalsy();
  });
  it('when receive an object, should return false', () => {
    const param = {
      name: 'test',
    };
    expect(isArray(param)).toBeFalsy();
  });
  it('when receive an empty array should return true', () => {
    expect(isArray([])).toBeTruthy();
  });
  it('when receive an filled array should return true', () => {
    expect(isArray([1, 2, 3])).toBeTruthy();
  });
});

describe('thanos', () => {
  describe('shuffleList', () => {
    it('should return a list', () => {
      const result = shuffleList([]);
      expect(result).toHaveLength(0);
    });
    it('should always return an array with the same length', () => {
      const result = shuffleList([1, 2, 3, 4, 5]);
      expect(result).toHaveLength(5);
    });
  });
  describe('thanos', () => {
    let obj: any;
    beforeEach(() => {
      obj = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
      };
    });
    it('should return a new object', () => {
      const result = thanos(obj);
      expect(result).not.toBe(obj);
    });
    it('should apply thanos funcion recursivelly', () => {
      const param = {
        child: obj,
      };
      const result = thanos(param);

      const keys = Object.keys(result.child);
      expect(keys).toHaveLength(2);
    });
    it('the object should result with half of fields', () => {
      const result = thanos(obj);
      const keys = Object.keys(result);
      expect(keys).toHaveLength(2);
    });
    it('array fields should have half of its elemtns removed', () => {
      const param = {
        ...obj,
        list: [1, 2, 3, 4, 5, 6],
      };
      const result = thanos(param);
      expect(result.list).toHaveLength(3);
    });
    it('arrays with just one element shoud randomlly removed that one element', () => {
      const param = [4];
      let result = thanos(param);
      if (result.length) {
        result = thanos(param);
      }
      if (result.length) {
        result = thanos(param);
      }
      expect(result).toHaveLength(0);
    });
  });
});
