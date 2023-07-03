import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import * as fs from 'fs/promises';
import * as fileSystem from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timerCallback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(timerCallback, timeout);
    expect(setTimeout).toHaveBeenCalledWith(timerCallback, timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const timerCallback = jest.fn();
    const timeout = 1000;
    doStuffByTimeout(timerCallback, timeout);
    expect(timerCallback).not.toBeCalled();
    jest.advanceTimersByTime(timeout);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const timerCallback = jest.fn();
    const timeout = 1000;
    doStuffByInterval(timerCallback, timeout);
    expect(setInterval).toHaveBeenCalledWith(timerCallback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const timerCallback = jest.fn();
    doStuffByInterval(timerCallback, 1000);
    expect(timerCallback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
  });
});

jest.mock('fs');
jest.mock('fs/promises');
describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    await readFileAsynchronously('./test.txt');
    expect(join).toHaveBeenCalled();
  });

  test('should return null if file does not exist', async () => {
    return expect(readFileAsynchronously('./test.txt')).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContentMock = 'File mock';
    jest.spyOn(fileSystem, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFile').mockReturnValue(Promise.resolve(fileContentMock));
    await expect(readFileAsynchronously('./test.txt')).resolves.toBe(fileContentMock);
  });
});
