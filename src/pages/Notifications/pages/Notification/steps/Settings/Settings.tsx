import React, { useCallback } from 'react';
import CardHeader from 'pages/Notifications/components/CardHeader/CardHeader';
import Grid from '@mui/material/Grid';
import MultipleEmailInput from 'components/MultipleEmailInput/MultipleEmailInput';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import { SettingsErrors, UseAlertForm } from 'pages/Notifications/hooks/useAlertForm';
import { styled } from '@mui/system';
import NotificationName from '../../../../components/Fields/NotificationName/NotificationName';
import Description from '../../../../components/Fields/Description/Description';
import Date from '../../../../components/Fields/Date/Date';
import Active from '../../../../components/Fields/Active/Active';

// Add margin bottom to show entire card while scrolling
const StyledGrid = styled(Grid)`
    margin-bottom: 50px;
`;

type GeneralProps = {
  alertForm: UseAlertForm;
  settingsErrors: SettingsErrors;
  domainName: string;
};

const General: React.FC<GeneralProps> = ({
  settingsErrors,
  domainName,
  alertForm,
}) => {
  const { state: alertState, handleSet, handleValidate } = alertForm;

  const { description, emails, name } = alertState.fields;

  const handleValidateEmail = useCallback(
    (value, options) => handleValidate({ emails: value }, options),
    [handleValidate],
  );

  return (
    <Grid item xs={6}>
      <RoundPanel color="#fff" sx={{ padding: '30px 30px 50px 30px' }}>
        <CardHeader name="General" />
        <NotificationName
          error={settingsErrors.name}
          handleValidate={(value) => handleValidate({ name: value })}
          setValue={(value) => handleSet({ key: 'name', value })}
          value={name}
        />
        <Description
          error={settingsErrors.description}
          handleValidate={(value) => handleValidate({ description: value })}
          setValue={(value) => handleSet({ key: 'description', value })}
          value={description}
        />
        <MultipleEmailInput
          domainName={domainName}
          emails={emails}
          error={settingsErrors.emails}
          handleValidate={handleValidateEmail}
          label="Recipients"
          setEmails={(value) => handleSet({ key: 'emails', value })}
        />
      </RoundPanel>
    </Grid>
  );
};

type TimeframeProps = {
  alertForm: UseAlertForm;
};

const Timeframe: React.FC<TimeframeProps> = ({ alertForm }) => {
  const { state: alertState, handleSet } = alertForm;

  const { isActive, startDate, endDate } = alertState.fields;

  return (
    <Grid item xs={6}>
      <RoundPanel color="#fff" sx={{ padding: '30px 30px 50px 30px' }}>
        <CardHeader name="Timeframe" />
        <Active
          setValue={(value) => handleSet({ key: 'isActive', value })}
          value={isActive}
        />
        <Date
          date={startDate}
          maxDate={endDate ? endDate.clone().subtract(1, 'days') : null}
          minDate={null}
          setDate={(value) => handleSet({ key: 'startDate', value })}
          start
        />
        <Date
          date={endDate}
          maxDate={null}
          minDate={startDate ? startDate.clone().add(1, 'days') : null}
          setDate={(value) => handleSet({ key: 'endDate', value })}
        />
      </RoundPanel>
    </Grid>
  );
};

type SettingsProps = {
  alertForm: UseAlertForm;
  domainName: string;
  settingsErrors: SettingsErrors;
};

const Settings: React.FC<SettingsProps> = ({
  alertForm,
  domainName,
  settingsErrors,
}) => (
  <StyledGrid
    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    container
    rowSpacing={1}
  >
    <General
      alertForm={alertForm}
      domainName={domainName}
      settingsErrors={settingsErrors}
    />
    <Timeframe alertForm={alertForm} />
  </StyledGrid>
);

export default Settings;
