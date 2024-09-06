const getVisibleImages = (
  images: string[],
  displayLimit?: number
): string[] => {
  if (displayLimit === undefined || displayLimit >= images.length) {
    return images;
  }

  return images.slice(0, displayLimit + 1);
};

export default getVisibleImages;
