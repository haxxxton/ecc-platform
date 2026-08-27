export function createMockChangeOrder() {
  return `MOCK-${crypto.randomUUID()}`;
}

export function formatEcoNumber(changeOrder: string) {
  const normalized = String(changeOrder).trim();
  if (!/^\d+$/.test(normalized)) return normalized;
  return normalized.replace(/^0+(?=\d)/, '');
}
