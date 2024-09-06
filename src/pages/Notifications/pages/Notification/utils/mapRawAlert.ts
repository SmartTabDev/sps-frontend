import { QUERY_DATE_FORMAT } from 'components/FormatDate/FormatDate';
import moment from 'moment';
import { AlertState } from 'pages/Notifications/hooks/useAlertForm';
import { Alert } from 'types/Notification';
import initialAlertForm from './initialAlertForm';

const mapRawAlert = (data: Alert): AlertState => {
  const fetchedAlert: AlertState = { ...initialAlertForm };

  fetchedAlert.name = data.name;
  fetchedAlert.description = data.description;
  fetchedAlert.isActive = data.isActive;
  fetchedAlert.availableOnly = data.availableOnly;
  fetchedAlert.emails = data.recipients;
  fetchedAlert.alertType = data.type;
  fetchedAlert.variantLinks = (data?.variantLinks || []).map(
    (v) => v.variantLinkId,
  );
  fetchedAlert.categories = (data?.categories || []).map(
    (v) => v.categoryId,
  );
  fetchedAlert.brands = (data?.brands || []).map((v) => v.brandId);
  fetchedAlert.retailers = (data?.retailers || []).map(
    (v) => v.retailerId,
  );

  if (data.startDate) {
    fetchedAlert.startDate = moment(data.startDate, QUERY_DATE_FORMAT);
  }

  if (data.endDate) {
    fetchedAlert.endDate = moment(data.endDate, QUERY_DATE_FORMAT);
  }

  fetchedAlert.sensitivity = 'any';

  if (data.triggers && data.triggers.length) {
    fetchedAlert.sensitivity = 'specyfic';
  }

  return fetchedAlert;
};

export default mapRawAlert;
