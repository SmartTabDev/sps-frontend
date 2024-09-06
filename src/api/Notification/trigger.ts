import { notificationApi } from 'api';
import handleRequestError from 'reducers/auth/handleRequestError';
import { TriggerType } from 'types/Notification';

export const saveTrigger = async (
  accesstoken: string,
  alertId: number,
  trigger: TriggerType,
): Promise<TriggerType | void> => {
  try {
    const { data } = await notificationApi({
      method: 'post',
      url: `/alert/${alertId}/trigger`,
      headers: {
        accesstoken,
      },
      data: trigger,
    });

    return data;
  } catch (error) {
    handleRequestError(error, 'saveTrigger');
  }
};

export const saveTriggers = async (
  accesstoken: string,
  alertId: number,
  triggers: TriggerType[],
): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const trigger of triggers) {
    await saveTrigger(accesstoken, alertId, trigger);
  }
};

export const removeTrigger = async (
  accesstoken: string,
  alertId: number,
  triggerId: number,
): Promise<TriggerType | void> => {
  try {
    const { data } = await notificationApi({
      method: 'delete',
      url: `/alert/${alertId}/trigger/${triggerId}`,
      headers: {
        accesstoken,
      },
    });

    return data;
  } catch (error) {
    handleRequestError(error, 'removeTrigger');
  }
};

export const removeTriggers = async (
  accesstoken: string,
  alertId: number,
  triggerIds: number[],
): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const triggerId of triggerIds) {
    await removeTrigger(accesstoken, alertId, triggerId);
  }
};

export const updateTrigger = async (
  accesstoken: string,
  alertId: number,
  trigger: TriggerType,
): Promise<TriggerType | void> => {
  try {
    const { data } = await notificationApi({
      method: 'put',
      url: `/alert/${alertId}/trigger/${trigger.id}`,
      headers: {
        accesstoken,
      },
      data: trigger,
    });

    return data;
  } catch (error) {
    handleRequestError(error, 'updateTrigger');
  }
};

export const updateTriggers = async (
  accesstoken: string,
  alertId: number,
  triggers: TriggerType[],
): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const trigger of triggers) {
    await updateTrigger(accesstoken, alertId, trigger);
  }
};
