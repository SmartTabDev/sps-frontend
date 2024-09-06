import { notificationApi } from 'api';
import { BrandItemRequest } from 'types/Notification';

export const saveBrands = async (
  accesstoken: string,
  alertId: number,
  items: BrandItemRequest[],
): Promise<BrandItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'post',
    url: `/alert/${alertId}/brand`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};

export const removeBrands = async (
  accesstoken: string,
  alertId: number,
  items: BrandItemRequest[],
): Promise<BrandItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'delete',
    url: `/alert/${alertId}/brand`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};
