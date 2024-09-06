const colors = ['#447EEB', '#434655', '#A8AABC', '#E24A67', '#A50039'];
const colorsMap: { [key: string]: string } = {
  'Media Expert': colors[0]!,
  MediaMarkt: colors[1]!,
  Neonet: colors[2]!,
  'RTV Euro AGD': colors[3]!,
};

const getColor = (retailerName: string): string => colorsMap[retailerName] || '';

export default getColor;
