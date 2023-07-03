import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  let data = [1, 2, 3];
  let path = 'path';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({data}));
    await throttledGetDataFromApi(path);
    jest.runAllTimers();
    expect(axios.create).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({data}));
    await throttledGetDataFromApi('path1');
    jest.runAllTimers();
    expect(axios.get).toBeCalledWith('path1');
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'create').mockReturnValue(axios);
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve({data}));
    await expect(throttledGetDataFromApi('')).resolves.toEqual(data);
  });
});
