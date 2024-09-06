import getCubeName from './getCubeName';

test('returns correct name', () => {
  expect(getCubeName('Variants', 'kpi')).toBe('Variants_kpi_prod');
});
