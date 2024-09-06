import { notificationApi } from 'api';
import { CategoryItemRequest } from 'types/Notification';

export const saveCategories = async (
  accesstoken: string,
  alertId: number,
  items: CategoryItemRequest[],
): Promise<CategoryItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'post',
    url: `/alert/${alertId}/category`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};

export const removeCategories = async (
  accesstoken: string,
  alertId: number,
  items: CategoryItemRequest[],
): Promise<CategoryItemRequest[] | void> => {
  const { data } = await notificationApi({
    method: 'delete',
    url: `/alert/${alertId}/category`,
    headers: {
      accesstoken,
    },
    data: items,
  });

  return data;
};
