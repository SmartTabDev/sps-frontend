import { notificationApi } from 'api';
import handleRequestError from 'reducers/auth/handleRequestError';
import { Recipient } from 'types/Notification';

export const saveRecipient = async (
  accesstoken: string,
  alertId: number,
  recipient: Recipient,
): Promise<Recipient | void> => {
  try {
    const { data } = await notificationApi({
      method: 'post',
      url: `/alert/${alertId}/recipient`,
      headers: {
        accesstoken,
      },
      data: recipient,
    });

    return data;
  } catch (error) {
    handleRequestError(error, 'saveRecipient');
  }
};

export const saveRecipients = async (
  accesstoken: string,
  alertId: number,
  recipients: Recipient[],
): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const recipient of recipients) {
    await saveRecipient(accesstoken, alertId, recipient);
  }
};

export const removeRecipient = async (
  accesstoken: string,
  alertId: number,
  recipientId: number,
): Promise<Recipient | void> => {
  try {
    const { data } = await notificationApi({
      method: 'delete',
      url: `/alert/${alertId}/recipient/${recipientId}`,
      headers: {
        accesstoken,
      },
    });

    return data;
  } catch (error) {
    handleRequestError(error, 'removeRecipient');
  }
};

export const removeRecipients = async (
  accesstoken: string,
  alertId: number,
  recipientIds: number[],
): Promise<void> => {
  // eslint-disable-next-line no-restricted-syntax
  for await (const recipientId of recipientIds) {
    await removeRecipient(accesstoken, alertId, recipientId);
  }
};
