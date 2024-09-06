const getMoreImagesCount = (
  totalImagesCount: number,
  displayLimit?: number
): number => {
  if (displayLimit === undefined || totalImagesCount <= displayLimit) {
    return 0;
  }

  if (totalImagesCount > displayLimit) {
    return totalImagesCount - displayLimit;
  }

  return 0;
};

export default getMoreImagesCount;
