import formatPrice from './formatPrice';

test('format 0', () => {
  expect(formatPrice(0)).toBe('0,00');
});

test('format positive int', () => {
  expect(formatPrice(12.37)).toBe('12,37');
});

test('format positive int converted to string', () => {
  expect(formatPrice(String(12.37))).toBe('12,37');
});
