/**
 * index.ts
 * Copyright (C) 2020 Editora Sanar
 *
 * Distributed under terms of the MIT license.
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module index.ts
 */

/**
 * isArray
 * Check if a given parameter is an valid array
 *
 * @author edgardleal@gmail.com
 * @since 07.01.21
 */
export function isArray(param: any): boolean {
  if (!param) {
    return false;
  }
  if (param.length !== undefined) {
    return true;
  }
  return false;
}

/**
 * Return a range sort for a givem list
 */
export function shuffleList<T = any>(params: T[]): T[] {
  const copy = [...params];
  const result: T[] = [];

  while (copy.length) {
    const index = Math.floor(Math.random() * copy.length);
    const value = copy[index];
    copy.splice(index, 1);
    result.push(value);
  }

  return result;
}

/**
 * Delete a field from given object
 */
export function actionDeleteField<T = any>(fieldName: string, obj: T): T {
  delete (obj as any)[fieldName]; // eslint-disable-line
  return obj;
}

export type ActionTypes = 'delete' | 'randomString';

const ACTIONS: {
  [key: string]: (field: string, obj: any) => void,
} = {};

ACTIONS.delete = actionDeleteField;

export interface ThanosParameter {
  action?: ActionTypes;
}

export const DEFAULT_CONFIGURATION: ThanosParameter = {
  action: 'delete',
};

/**
 * Random delte half of object properties
 */
export default function thanos<T = any>(param: T, parameters: ThanosParameter = {}): T {
  if (isArray(param)) {
    if ((param as unknown as any[]).length === 1) {
      if (Math.round(Math.random() * 1)) {
        return [] as unknown as T;
      }
      return param;
    }
    const arrayResult = shuffleList(param as unknown as any[]);
    const halfCount = Math.round(arrayResult.length / 2);
    return (arrayResult.splice(0, halfCount)) as unknown as T;
  }
  const keys: string[] = Object.keys(param);
  const halfCount = Math.round(keys.length / 2);
  const shuffledFields = shuffleList(keys).splice(0, halfCount);
  const result: T = {
    ...param,
  };
  const { action } = {
    ...DEFAULT_CONFIGURATION,
    ...parameters,
  };

  const actionFunction = ACTIONS[action!];

  for (let i = 0; i < shuffledFields.length; i += 1) {
    const item = shuffledFields[i];
    actionFunction(item, result as any);
  }

  const remainingFields = Object.keys(param);
  for (let i = 0; i < remainingFields.length; i += 1) {
    const field = remainingFields[i];
    if (typeof (param as any)[field] === 'object') {
      (result as any)[field] = thanos((param as any)[field]);
    }
  }

  return result;
}
