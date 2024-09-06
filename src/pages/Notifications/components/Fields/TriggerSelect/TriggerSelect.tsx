import React from 'react';
import Select from 'components/Select';
import {
  TriggerActionType,
  UseTriggers,
} from 'pages/Notifications/hooks/useTriggers';
import { TriggerOption, TriggerSelectOptions } from './TriggerSelectOptions';

export const isMetricTrigger = (option?: TriggerOption): boolean => Boolean(option)
  && (option!.value === 'lowerThan' || option!.value === 'higherThan');

type Props = {
  value: TriggerOption;
  setValue: (trigger: TriggerOption) => void;
  triggers: UseTriggers;
  id?: string | number;
};

const TriggerSelect: React.FC<Props> = ({
  value, setValue, triggers, id,
}) => (
  <Select<TriggerOption, false, true, false>
    options={TriggerSelectOptions}
    getOptionLabel={(option) => (option && option.name ? `${option.name}` : '')}
    label="Trigger"
    placeholder="Select trigger type"
    value={value as any}
    blurOnSelect
    disableClearable
    onChange={(_e, val) => {
      setValue(val);

      if (id) {
        triggers.dispatch({
          type: TriggerActionType.INVALIDATE,
          payload: { id },
        });
      }
    }}
    margin="dense"
    isOptionEqualToValue={(item, val) => (val && item ? item.name === val.name : false)}
    variant="outlined"
  />
);

export default TriggerSelect;
