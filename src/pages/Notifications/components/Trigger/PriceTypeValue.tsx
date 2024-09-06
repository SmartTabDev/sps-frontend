import React from 'react';
import Grid from '@mui/material/Grid';
import { TriggerFields } from 'pages/Notifications/utils/mapTrigger';
import { UseTriggers } from 'pages/Notifications/hooks/useTriggers';
import Active from '../Fields/Active/Active';
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

const PriceTypeValue: React.FC<ValueProps> = ({
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
    anyMetricChange, // decides should validate RRP
    triggerValue,
    triggerValueType,
  } = data;

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1 }}
      sx={{ marginTop: '17px' }}
    >
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <Active
          value={Boolean(anyMetricChange)}
          setValue={(val) => {
            handleUpdateTrigger(triggerId, {
              anyMetricChange: val,
              ...(val ? {} : { triggerValue: undefined }),
            });
          }}
          label="By"
          margin="8px 0 0 0"
        />
      </Grid>
      <Grid item xs={4}>
        <TriggerValue
          value={triggerValue}
          setValue={(val) => {
            handleUpdateTrigger(triggerId, { triggerValue: val });
          }}
          min={minPercentage}
          max={maxPercentage}
          disabled={!anyMetricChange}
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
          disabled={!anyMetricChange}
        />
      </Grid>
    </Grid>
  );
};

export default PriceTypeValue;
