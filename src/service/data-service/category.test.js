'use strict';

const multiply = (a, b) => a * b;

test(`multiply 2 by 2 should be equal 4`, () => {
  expect(multiply(2, 2)).toBe(4);
});
