import {
  SettingsErrors,
  ProductsErrors,
} from 'pages/Notifications/hooks/useAlertForm';
import { useCallback, useState } from 'react';

type Steps = 'settings' | 'alertSensitivity' | 'products';

type Step = {
  name: string;
  description: string;
  error: boolean;
};

type Config = {
  [key in Steps]: Step;
};

const config: Config = {
  settings: {
    name: 'Settings',
    description: 'Define notification settings',
    error: false,
  },
  alertSensitivity: {
    name: 'Alert sensitivity',
    description: 'Define alert sensitivity',
    error: false,
  },
  products: {
    name: 'Products',
    description: 'Select products',
    error: false,
  },
};

const stepsArray: Step[] = Object.values(config);

export type UseSteps = {
  steps: Step[];
  stepper: string[];
  tabs: string[];
  step: number;
  handleNext: () => void;
  handleResetSteps: () => void;
  handleSetStep: (step: number) => void;
};

const useSteps = (
  settingsErrors: SettingsErrors,
  productsErrors: ProductsErrors,
  invalidTriggerIds: (string | number)[]
): UseSteps => {
  const [step, setStep] = useState<number>(0);

  const handleNext = useCallback(() => {
    setStep((prevActiveStep) => prevActiveStep + 1);
  }, []);

  const handleResetSteps = useCallback(() => {
    setStep(0);
  }, []);

  const handleSetStep = useCallback((s: number) => {
    setStep(s);
  }, []);

  const settingsFormError =
    Object.values(settingsErrors).filter(Boolean).length > 0;
  const productsFormError =
    Object.values(productsErrors).filter(Boolean).length > 0;
  const alertSensitivityFormError = invalidTriggerIds.length > 0;

  return {
    steps: stepsArray.map((currentStep) => {
      if (currentStep.name === 'Settings') {
        return {
          ...currentStep,
          error: settingsFormError,
        };
      }

      if (currentStep.name === 'Products') {
        return {
          ...currentStep,
          error: productsFormError,
        };
      }

      if (currentStep.name === 'Alert sensitivity') {
        return {
          ...currentStep,
          error: alertSensitivityFormError,
        };
      }

      return currentStep;
    }),
    stepper: stepsArray.map((s) => s.description),
    tabs: stepsArray.map((s) => s.name),
    step,
    handleNext,
    handleSetStep,
    handleResetSteps,
  };
};

export default useSteps;
