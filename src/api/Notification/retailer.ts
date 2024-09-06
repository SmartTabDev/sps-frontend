import { notificationApi } from 'api';
import { RetailerItemRequest } from 'types/Notification';

export const saveRetailers = async (
  accesstoken: string,
  alertId: number,
  items: RetailerItemRequest[],
): Promise<RetailerItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'post',
    url: `/alert/${alertId}/retailer`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};

export const removeRetailers = async (
  accesstoken: string,
  alertId: number,
  items: RetailerItemRequest[],
): Promise<RetailerItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'delete',
    url: `/alert/${alertId}/retailer`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};
