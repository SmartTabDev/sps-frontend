export function useCardWidth(cards = 4): number {
  const cardCount = cards < 6 ? cards : 6;

  return cardCount;
}
