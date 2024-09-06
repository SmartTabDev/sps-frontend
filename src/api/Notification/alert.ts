import { notificationApi } from 'api';
import { Alert, AlertListItem } from 'types/Notification';
import { includeLowerCase } from 'utils/includeLowerCase';

export const getAlerts = async (
  accesstoken: string,
  configId: number | undefined,
  filter: string
): Promise<AlertListItem[] | void> => {
  const { data } = await notificationApi({
    method: 'get',
    url: `/alert/`,
    headers: {
      accesstoken,
    },
    params: {
      ConfigId: configId,
    },
  });

  const result = filter
    ? data.filter(
        (n: AlertListItem) =>
          includeLowerCase(n.name, filter) ||
          includeLowerCase(n.description, filter)
      )
    : data;

  return result;
};

export const getAlert = async (
  accesstoken: string,
  id: number
): Promise<Alert | void> => {
  const { data } = await notificationApi({
    method: 'get',
    url: `/alert/${id}`,
    headers: {
      accesstoken,
    },
  });

  return data;
};

export const saveAlert = async (
  accesstoken: string,
  configId: number | undefined,
  alert: Alert
): Promise<Alert | void> => {
  const { data } = await notificationApi({
    method: 'post',
    url: '/alert',
    headers: {
      accesstoken,
    },
    data: { ...alert, ConfigId: configId },
  });

  return data;
};

export const updateAlert = async (
  accesstoken: string,
  alertId: number,
  alert: Alert
): Promise<Alert | void> => {
  const { data } = await notificationApi({
    method: 'put',
    url: `/alert/${alertId}`,
    headers: {
      accesstoken,
    },
    data: alert,
  });

  return data;
};

export const removeAlert = async (
  accesstoken: string,
  alertId: number
): Promise<Alert | void> => {
  const { data } = await notificationApi({
    method: 'delete',
    url: `/alert/${alertId}`,
    headers: {
      accesstoken,
    },
  });

  return data;
};
