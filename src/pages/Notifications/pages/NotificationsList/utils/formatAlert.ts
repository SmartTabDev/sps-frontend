import { QUERY_DATE_FORMAT } from 'components/FormatDate/FormatDate';
import { AlertListItem } from 'types/Notification';
import moment from 'moment';
import { ProductLink } from 'types/AppConfig';
import { Row } from '../types';
import filterProductLinks from '../../Notification/utils/filterProductLinks';

const formatAlert =
  (allLinks: ProductLink[]) =>
  (alert: AlertListItem): Row => {
    const {
      description,
      endDate,
      id,
      isActive,
      name,
      startDate,
      type,
      brands,
      categories,
      recipients,
      retailers,
      variantLinks,
    } = alert;

    if (!allLinks) {
      return [];
    }

    const allLinksLength = allLinks.length;

    const brandsCount = brands.length;
    const categoriesCount = categories.length;
    const recipientsCount = recipients.length;
    const retailersCount = retailers.length;
    const variantLinksCount = variantLinks.length;

    const filteredProducts = filterProductLinks(
      allLinks,
      retailers,
      categories,
      brands
    );
    const productSum = filteredProducts.length;

    const mEndDate = moment(endDate, QUERY_DATE_FORMAT);
    const isExpired = mEndDate.isBefore(moment()) ? 'expired' : '';

    return {
      createDate: startDate ? moment(startDate).format('DD/MM/YYYY') : 'N/A',
      description,
      endDate: endDate ? moment(endDate).format('DD/MM/YYYY') : '-',
      id,
      name,
      status: isExpired || (isActive ? 'active' : 'inactive'),
      productsCount:
        type === 'all' ? allLinksLength : productSum + variantLinksCount,
      brandsCount,
      categoriesCount,
      recipientsCount,
      retailersCount,
      variantLinksCount,
    };
  };

export default formatAlert;
