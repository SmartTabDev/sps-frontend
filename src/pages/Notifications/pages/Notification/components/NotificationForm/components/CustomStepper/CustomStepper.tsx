import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import { UseSteps } from 'pages/Notifications/pages/Notification/hooks/useSteps';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.secondary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : 'rgba(82, 95, 129, 0.3)',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[700]
        : 'rgba(82, 95, 129, 0.3)',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
      color: theme.palette.secondary.main,
    }),
    '& .QontoStepIcon-completedIcon': {
      color: theme.palette.secondary.main,
      zIndex: 1,
      fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  }),
);

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const StyledStepLabel = styled(StepLabel)`
  .MuiStepLabel-label.MuiStepLabel-alternativeLabel {
    text-transform: uppercase;
    font-size: 12px;
    line-height: 40px;
    margin-top: 0;

    &.MuiStepLabel-label.Mui-active {
      font-weight: bold;
    }
  }
`;

const StyledStepper = styled(Stepper)`
  width: 810px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledClose = styled(Close, { shouldForwardProp: () => false })`
  color: #f00f00;
  font-size: 14px;
  height: 22px;
`;

type Props = {
  step: number;
  steps: UseSteps['steps'];
};

const CustomStepper: React.FC<Props> = ({ step, steps }) => (
  <StyledStepper
    activeStep={step}
    alternativeLabel
    connector={<QontoConnector />}
  >
    {steps.map(({ description, error }) => {
      const stepProps: { completed?: boolean } = {};
      const labelProps: {
        optional?: React.ReactNode;
        error?: boolean;
      } = {};

      if (error) {
        labelProps.error = true;
      }

      return (
        <Step key={description} {...stepProps}>
          <StyledStepLabel
            StepIconComponent={labelProps.error ? StyledClose : QontoStepIcon}
            {...labelProps}
          >
            {description}
          </StyledStepLabel>
        </Step>
      );
    })}
  </StyledStepper>
);

export default CustomStepper;
