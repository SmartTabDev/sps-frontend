import { notificationApi } from 'api';
import { VariantLinkItemRequest } from 'types/Notification';

export const saveVariantLinks = async (
  accesstoken: string,
  alertId: number,
  items: VariantLinkItemRequest[],
): Promise<VariantLinkItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'post',
    url: `/alert/${alertId}/variant-link`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};

export const removeVariantLinks = async (
  accesstoken: string,
  alertId: number,
  items: VariantLinkItemRequest[],
): Promise<VariantLinkItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'delete',
    url: `/alert/${alertId}/variant-link`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};
