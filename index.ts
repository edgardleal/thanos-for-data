/**
 * index.ts
 * Copyright (C) 2020 Editora Sanar
 *
 * Distributed under terms of the MIT license.
 * @author Edgard Leal <edgard.leal@sanar.com>
 * @module index.ts
 */

/**
 * Return a range sort for a givem list
 */
export function shuffleList<T = any>(params: T[]): T[] {
  const copy = [...params];
  const result: T[] = [];

  while (copy.length) {
    const index = Math.round(Math.random() * copy.length);
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
  const keys: string[] = Object.keys(param);
  const halfCount = Math.round(keys.length / 2);
  const shuffledFields = shuffleList(keys).splice(halfCount, halfCount + 1);
  const { action } = {
    ...DEFAULT_CONFIGURATION,
    ...parameters,
  };

  const actionFunction = ACTIONS[action!];

  for (let i = 0; i < shuffledFields.length; i += 1) {
    const item = shuffledFields[i];
    actionFunction(item, param as any);
  }

  const remainingFields = Object.keys(param);
  for (let i = 0; i < remainingFields.length; i += 1) {
    const field = remainingFields[i];
    if (typeof (param as any)[field] === 'object') {
      thanos((param as any)[field]);
    }
  }

  return param;
}
