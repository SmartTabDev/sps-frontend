import React from 'react';
import Grid from '@mui/material/Grid';
import { TriggerFields } from 'pages/Notifications/utils/mapTrigger';
import { UseTriggers } from 'pages/Notifications/hooks/useTriggers';
import TriggerValue from '../Fields/TriggerValue/TriggerValue';
import ValueTypesSwitch from '../Fields/ValueTypesSwitch/ValueTypesSwitch';
import { TriggerPercentage } from './utils/getTriggerPercentage';

type ValueProps = {
    percentages: TriggerPercentage;
    handleUpdateTrigger: (
      id: string | number,
      fields: Partial<TriggerFields>
    ) => void;
    data: TriggerFields;
    triggerId: string | number;
    triggers: UseTriggers;
  };

const SimpleValue: React.FC<ValueProps> = ({
  percentages,
  handleUpdateTrigger,
  data,
  triggerId,
  triggers,
}) => {
  const {
    state: { invalidIds },
  } = triggers;

  const { minPercentage, maxPercentage } = percentages;

  const {
    triggerValue,
    triggerValueType,
  } = data;

  return (
    <>
      <Grid item xs={4}>
        <TriggerValue
          value={triggerValue}
          setValue={(val) => {
            handleUpdateTrigger(triggerId, { triggerValue: val });
          }}
          min={minPercentage}
          max={maxPercentage}
          error={invalidIds.includes(String(triggerId))}
        />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <ValueTypesSwitch
          value={triggerValueType}
          setValue={(val) => {
            handleUpdateTrigger(triggerId, { triggerValueType: val });
          }}
        />
      </Grid>
    </>
  );
};

export default SimpleValue;
