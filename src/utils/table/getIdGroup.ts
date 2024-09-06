const getGroup = <T>(array: T[], keyword: keyof T) => {
  const groupArray: { id: number }[] = [];
  array.forEach((item) => {
    const key = (item[keyword] as any) as number;

    if (!groupArray.some((el) => el.id === key)) {
      groupArray.push({ id: key });
    }
  });

  return groupArray;
};

export default getGroup;
