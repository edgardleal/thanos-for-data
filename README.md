
# Thanos for Data

![Tests](https://github.com/edgardleal/thanos-for-data/workflows/Node.js%20CI/badge.svg)

This library will remove the half of properties on a given object.

## Purpose

This library was created for test purpose.

With Thanos For Data, you can validate your tests to check if your code
is ready do deal with incomplete payload.

## Usage

```js
import thanos from 'thanos-for-data';

const myData = {
  name: 'Test',
  phone: '1234567',
  account: 1234,
  status: true,
};

const result = thanos(myData);

console.log(result);
```

output:

```shell
{
  phone: '1234567',
  status: true,
}
```
