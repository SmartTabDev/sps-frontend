export function calculateCardWidth(
  totalCards: number,
  gapWidth: number
): number {
  const screenWidth = window.innerWidth;
  const cardWidthPercent = (100 - (gapWidth / screenWidth) * 100) / totalCards;
  return cardWidthPercent > 0 ? cardWidthPercent : 25;
}
