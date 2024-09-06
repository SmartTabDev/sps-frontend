import React, { useCallback, useEffect } from 'react';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import { Line } from 'components/Line/Line';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import RadioButton from 'components/RadioButton';
import { UseTriggers, TriggerActionType, initialTrigger } from 'pages/Notifications/hooks/useTriggers';
import { v4 as uuidv4 } from 'uuid';
import { TriggerOption } from 'pages/Notifications/components/Fields/TriggerSelect/TriggerSelectOptions';
import { TriggerFields } from 'pages/Notifications/utils/mapTrigger';
import { styled } from '@mui/system';
import CardHeader from 'pages/Notifications/components/CardHeader/CardHeader';
import Trigger from '../../../../components/Trigger/Trigger';
import TriggerSelect from '../../../../components/Fields/TriggerSelect/TriggerSelect';

type Props = {
  availableOnly: boolean;
  setAvailableOnly: (value: boolean) => void;
  value: string | undefined;
  setValue: (value: 'any' | 'specyfic' | undefined) => void;
  trigger: TriggerOption;
  setTrigger: React.Dispatch<React.SetStateAction<TriggerOption>>;
  triggers: UseTriggers;
};

const SpecyficChangeWrapper = styled('div')`
  max-width: 670px;
`;

const AdjustedToTopSelectWrapper = styled('div')`
  width: calc(100% - 50px);
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  margin-top: 16px;
`;

const AlertSensitivity: React.FC<Props> = ({
  availableOnly,
  setAvailableOnly,
  value,
  setValue,
  trigger,
  setTrigger,
  triggers,
}) => {
  const { dispatch: triggerDispatch, state: triggersState } = triggers;
  const switchAvailableOnly = () => {
    setAvailableOnly(!availableOnly);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value as any);
  };

  // trigger actions
  const handleRemoveTrigger = useCallback(
    (id: string | number) => {
      triggerDispatch({
        type: TriggerActionType.REMOVE,
        payload: {
          id,
        },
      });
    },
    [triggerDispatch],
  );

  // add new trigger on select change
  useEffect(() => {
    if (trigger) {
      triggerDispatch({
        type: TriggerActionType.ADD,
        payload: {
          id: `t-${uuidv4()}`,
          value: {
            ...initialTrigger,
            trigger,
          },
        },
      });
    }

    setTrigger(null as any);
  }, [trigger, triggerDispatch, setTrigger]);

  return (
    <RoundPanel color="#fff" sx={{ padding: '30px' }}>
      <CardHeader
        name="Alert sensitivity"
        text="Define the triggers for the notification alert."
      />
      <RadioGroup value={value} onChange={handleRadioChange}>
        <RadioButton label="Any price change" value="any" />
        <RadioButton label="Specific price change" value="specyfic" />
      </RadioGroup>
      {value === 'specyfic' && (
        <SpecyficChangeWrapper>
          {Object.entries(triggersState.fields).map(([id, data]) => (
            <Trigger
              data={data as TriggerFields}
              id={id}
              key={id}
              handleRemove={handleRemoveTrigger}
              triggers={triggers}
            />
          ))}
          <AdjustedToTopSelectWrapper>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1 }}
              sx={{ alignItems: 'flex-start', display: 'flex' }}
            >
              <Grid item xs={6}>
                <TriggerSelect
                  value={trigger}
                  setValue={setTrigger}
                  triggers={triggers}
                />
              </Grid>
            </Grid>
          </AdjustedToTopSelectWrapper>
        </SpecyficChangeWrapper>
      )}
      <Line height={1} background="#E4E6EC" margin="22px 0 0 0" />
      <StyledFormControlLabel
        control={(
          <Checkbox
            color="primary"
            checked={availableOnly}
            name="availableOnly"
            onChange={switchAvailableOnly}
            disabled={false}
          />
        )}
        label="Alert only on available products"
      />
    </RoundPanel>
  );
};

export default AlertSensitivity;
