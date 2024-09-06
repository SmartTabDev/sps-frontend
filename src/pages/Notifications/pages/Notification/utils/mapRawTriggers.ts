import merge from 'lodash/merge';
import partial from 'lodash/partial';
import spread from 'lodash/spread';
import { TriggersState } from 'pages/Notifications/hooks/useTriggers';
import { mapTriggerToFields } from 'pages/Notifications/utils/mapTrigger';
import { Alert, TriggerType } from 'types/Notification';

type Fields = TriggersState['fields'];

const mapRawTriggers = (data: Partial<Alert>): Fields => {
  const fields = (data.triggers as TriggerType[] || []).map(
    mapTriggerToFields,
  );

  const fieldsIdMap = merge(
    fields
      .filter(({ id }) => Boolean(id))
      .map((field) => ({ [field.id as string]: field })),
  );

  // spread array to object
  const spreadFields = spread(partial(merge, {}));
  const fieldsValue = spreadFields(fieldsIdMap);

  return fieldsValue;
};

export default mapRawTriggers;
