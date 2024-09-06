import orderBy from 'lodash/orderBy';
import toLower from 'lodash/toLower';

const orderByName = (arr: any[]): any[] => orderBy(arr, (i) => toLower(i.name), ['asc']);

export default orderByName;
