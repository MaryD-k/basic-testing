// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({a: 4, b: 8, action: Action.Add})).toBe(12);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({a: 13, b: 5, action: Action.Subtract})).toBe(8);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({a: 7, b: 2, action: Action.Multiply})).toBe(14);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({a: 20, b: 5, action: Action.Divide})).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({a: 5, b: 2, action: Action.Exponentiate})).toBe(25);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({a: 4, b: 8, action: 'Sum'})).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({a: 4, b: 'notNumber', action: Action.Add})).toBeNull();
  });
});
