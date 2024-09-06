import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { TriggerActionType, UseTriggers } from 'pages/Notifications/hooks/useTriggers';
import { TriggerFields } from 'pages/Notifications/utils/mapTrigger';
import PriceTypeValue from './PriceTypeValue';
import RemoveTrigger from './RemoveTrigger';
import SimpleValue from './SimpleValue';
import StyledTriggerWrapper from './TriggerWrapper.styled';
import TriggerPriceTypeSelect from '../Fields/TriggerPriceTypeSelect/TriggerPriceTypeSelect';
import TriggerSelect, { isMetricTrigger } from '../Fields/TriggerSelect/TriggerSelect';
import getTriggerPercentage from './utils/getTriggerPercentage';
import { TriggerOption } from '../Fields/TriggerSelect/TriggerSelectOptions';

type Props = {
  data: TriggerFields;
  id: string | number;
  handleRemove: (index: number | string) => void;
  triggers: UseTriggers;
};

const Trigger: React.FC<Props> = ({
  data,
  id: triggerId,
  handleRemove,
  triggers,
}) => {
  const {
    dispatch: triggerDispatch,
  } = triggers;
  const {
    trigger, triggerValue, triggerPriceType,
  } = data;

  const isMetric = isMetricTrigger(trigger);
  const percentages = getTriggerPercentage(data);

  const handleUpdateTrigger = useCallback(
    (id: string | number, fields: Partial<TriggerFields>) => {
      triggerDispatch({
        type: TriggerActionType.UPDATE,
        payload: {
          id,
          value: fields,
        },
      });
    },
    [triggerDispatch],
  );

  const handleTriggerSelectChange = useCallback((val: TriggerOption) => {
    let tAnyMetricChange;
    let tTriggerValue = triggerValue;

    // reset values from validation purposes
    if (isMetricTrigger(val)) {
      tAnyMetricChange = false;
      tTriggerValue = null;
    }

    handleUpdateTrigger(triggerId, {
      trigger: val,
      anyMetricChange: tAnyMetricChange,
      triggerValue: tTriggerValue,
    });
  }, [triggerId, triggerValue, handleUpdateTrigger]);

  return (
    <StyledTriggerWrapper $border={isMetric}>
      <div>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1 }}
          sx={{ alignItems: 'center', display: 'flex' }}
        >
          <Grid item xs={6}>
            <TriggerSelect
              value={trigger}
              setValue={handleTriggerSelectChange}
              triggers={triggers}
              id={triggerId}
            />
          </Grid>
          {isMetric && (
            <Grid item xs={6}>
              <TriggerPriceTypeSelect
                value={triggerPriceType}
                setValue={(val) => {
                  handleUpdateTrigger(triggerId, {
                    triggerPriceType: val,
                  });
                }}
              />
            </Grid>
          )}
          {!isMetric && (
            <SimpleValue
              data={data}
              triggerId={triggerId}
              handleUpdateTrigger={handleUpdateTrigger}
              percentages={percentages}
              triggers={triggers}
            />
          )}
        </Grid>
        {isMetric && (
          <PriceTypeValue
            data={data}
            triggerId={triggerId}
            handleUpdateTrigger={handleUpdateTrigger}
            percentages={percentages}
            triggers={triggers}
          />
        )}
      </div>
      <RemoveTrigger
        handleRemove={handleRemove}
        triggerId={triggerId}
        show={Boolean(trigger)}
      />
    </StyledTriggerWrapper>
  );
};

export default Trigger;
