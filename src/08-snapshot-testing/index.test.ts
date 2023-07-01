import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [1];
    expect(generateLinkedList(elements)).toStrictEqual({value: 1, next: {
      next: null,
      value: null
    }});
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, 2]);
    expect(list).toMatchSnapshot();
  });
});
