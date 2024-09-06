import { getTimezoneDate } from 'utils/dates/addParsedDate';

const tooltipFormatter = (params: any) => getTimezoneDate(params.value).format('DD/MM/YYYY HH:mm');

export default tooltipFormatter;
