export const sanitizeName = (name: string) => {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '');
};
