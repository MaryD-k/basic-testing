import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect.assertions(1);
    return expect(resolveValue(5)).resolves.toBe(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Return error';
    expect.assertions(1);
    try {
      throwError(errorMessage)
    }
    catch(e) {
      expect(e).toEqual(new Error(errorMessage));
    }
  });

  test('should throw error with default message if message is not provided', () => {
    expect.assertions(1);
    try {
      throwError()
    }
    catch(e) {
      expect(e).toEqual(new Error('Oops!'));
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect.assertions(1);
    try {
      throwCustomError()
    }
    catch(e) {
      expect(e).toEqual(new MyAwesomeError());
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    return expect(rejectCustomError()).rejects.toEqual(new MyAwesomeError());
  });
});
