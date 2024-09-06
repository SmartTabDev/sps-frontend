import React, { useCallback, useState } from 'react';
import { styled } from '@mui/system';
import { useHistory } from 'react-router-dom';
import AlertSensitivity from 'pages/Notifications/pages/Notification/steps/AlertSensitivity/AlertSensitivity';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import Mountains from 'components/Mountains/Mountains';
import WarningIcon from '@mui/icons-material/Warning';
import { AlertType } from 'types/Notification';
import { ProductLink } from 'types/AppConfig';
import { StyledTabs, StyledTab } from 'components/LocationTabs/LocationTabs';
import {
  ProductsErrors,
  SettingsErrors,
  UseAlertForm,
} from 'pages/Notifications/hooks/useAlertForm';
import { UseTriggers } from 'pages/Notifications/hooks/useTriggers';
import { TriggerOption } from 'pages/Notifications/components/Fields/TriggerSelect/TriggerSelectOptions';
import { Box } from '@mui/material';
import { UseCustomCategoriesFilters } from '../../hooks/useCustomCategoriesFilters';
import { UseSteps } from '../../hooks/useSteps';
import filterProductLinks from '../../utils/filterProductLinks';
import Products from '../../steps/Products/Products';
import CategoriesModal from './components/CategoriesModal/CategoriesModal';
import BottomBar from '../../../../components/BottomBar/BottomBar';
import AllProducts from './components/Products/AllProducts/AllProducts';
import Settings from '../../steps/Settings/Settings';

const StepsWrapper = styled(Box)`
  margin: 15px 20px 0 20px;
  z-index: 1;
`;

type GetTotalStats = {
  alertType: AlertType;
  totalProducts: number;
  totalSelected: number;
  category: number;
  categoryError: boolean;
  onCategoryClick: () => void;
  show: boolean;
};

const getTotalStats = (args: GetTotalStats) => {
  const {
    alertType,
    totalProducts,
    totalSelected,
    show,
    category,
    onCategoryClick,
    categoryError,
  } = args;
  const totalStats: any[] = [];

  if (!show) {
    return totalStats;
  }

  if (alertType === 'product' || alertType === 'all') {
    totalStats.push({
      name: 'Total products',
      value: totalProducts,
    });
  }

  if (alertType === 'product') {
    totalStats.push({
      name: 'Total selected',
      value: totalSelected,
    });
  }

  if (alertType === 'category') {
    totalStats.push({
      name: 'Total tracked products',
      value: category,
      button: category > 0 ? '(Preview)' : undefined,
      onButtonClick: category > 0 ? onCategoryClick : undefined,
      error: categoryError,
    });
  }

  return totalStats;
};

type Props = {
  // form
  alertForm: UseAlertForm;
  setTrigger: React.Dispatch<React.SetStateAction<TriggerOption>>;
  trigger: TriggerOption;
  // actions
  action: 'save' | 'update';
  alertLoading: boolean;
  alertSaving: boolean;
  handleSave: (cb: () => void) => void;
  handleUpdate: (cb: () => void) => void;
  // step
  steps: UseSteps;
  // config
  domainName: string;
  productLinks: ProductLink[];
  // errors
  setSnackbar: (value: boolean) => void;
  // custom categories filters
  customCategoriesFilters: UseCustomCategoriesFilters;
  settingsErrors: SettingsErrors;
  productsErrors: ProductsErrors;
  triggers: UseTriggers;
  finalErrorMessage: string;
};

const NotificationForm: React.FC<Props> = ({
  action,
  alertForm,
  alertLoading,
  alertSaving,
  domainName,
  handleSave,
  handleUpdate,
  productLinks,
  setSnackbar,
  setTrigger,
  steps,
  trigger,
  customCategoriesFilters,
  settingsErrors,
  productsErrors,
  triggers,
  finalErrorMessage,
}) => {
  const { handleNext, handleSetStep, step, steps: stepsList } = steps;
  // modal
  const [customCategoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const handleCategoriesModalOpen = () => setCategoriesModalOpen(true);
  const handleCategoriesModalClose = () => setCategoriesModalOpen(false);

  const { state: alertState, handleSet } = alertForm;

  // fields
  const { alertType, availableOnly, sensitivity, variantLinks } =
    alertState.fields;

  // form actions
  const isLastStep = step === steps.steps.length - 1;
  const history = useHistory();

  const redirectToNotifications = useCallback(() => {
    history.push('/price-analysis/alerts');
  }, [history]);

  const handleFinalAction = useCallback(async () => {
    if (action === 'save') {
      await handleSave(redirectToNotifications);
    } else {
      await handleUpdate(redirectToNotifications);
    }
  }, [action, handleSave, handleUpdate, redirectToNotifications]);

  const categoryProducts = filterProductLinks(
    productLinks,
    alertState.fields.retailers.map((id) => Number(id)),
    alertState.fields.categories.map((id) => Number(id)),
    alertState.fields.brands.map((id) => Number(id))
  );

  return (
    <>
      <StyledTabs value={step} margin={20}>
        {stepsList.map(({ name, error }, index) => (
          <StyledTab
            key={name}
            disableFocusRipple
            disableRipple
            error={error}
            icon={error ? <WarningIcon /> : ''}
            iconPosition="start"
            label={name}
            onClick={() => {
              handleSetStep(index);
            }}
          />
        ))}
      </StyledTabs>
      {alertLoading && (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      )}
      {!alertLoading && (
        <StepsWrapper sx={{ marginBottom: '40px' }}>
          {step === 0 ? (
            <Settings
              alertForm={alertForm}
              domainName={domainName}
              settingsErrors={settingsErrors}
            />
          ) : null}
          {step === 1 ? (
            <AlertSensitivity
              availableOnly={availableOnly}
              setAvailableOnly={(value) =>
                handleSet({ key: 'availableOnly', value })
              }
              setTrigger={setTrigger}
              setValue={(value) => handleSet({ key: 'sensitivity', value })}
              trigger={trigger}
              value={sensitivity}
              triggers={triggers}
            />
          ) : null}
          {step === 2 ? (
            <Products
              alertForm={alertForm}
              productLinks={productLinks}
              customCategoriesFilters={customCategoriesFilters}
            />
          ) : null}
        </StepsWrapper>
      )}
      <Mountains grey />
      <BottomBar
        totalStats={getTotalStats({
          alertType,
          totalProducts: productLinks.length,
          totalSelected: variantLinks.length,
          show: isLastStep,
          category: categoryProducts.length,
          categoryError:
            Object.values(productsErrors).filter(Boolean).length > 0,
          onCategoryClick: handleCategoriesModalOpen,
        })}
        primaryAction={{
          error: Boolean(finalErrorMessage),
          handleClick: isLastStep ? handleFinalAction : handleNext,
          handleError: () => setSnackbar(true),
          isLoading: alertSaving,
          showSnackbar: isLastStep,
          redirectTo: isLastStep ? '/price-analysis/alerts' : undefined,
          text: isLastStep ? 'Save' : 'Next',
        }}
        secondaryAction={{
          disabled: step === 0,
          redirectTo: '/price-analysis/alerts',
          text: 'Cancel',
        }}
      />
      <CategoriesModal
        open={customCategoriesModalOpen}
        handleClose={handleCategoriesModalClose}
      >
        <AllProducts products={categoryProducts} />
      </CategoriesModal>
    </>
  );
};

export default NotificationForm;
