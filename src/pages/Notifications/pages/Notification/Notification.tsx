import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
// pages
import getDifference from 'pages/Notifications/utils/getDifference';
import { TriggerOption } from 'pages/Notifications/components/Fields/TriggerSelect/TriggerSelectOptions';
// hooks
import useAlertForm from 'pages/Notifications/hooks/useAlertForm';
import useTriggers from 'pages/Notifications/hooks/useTriggers';
// components
import Page from 'components/Page/Page';
// context
import { ConfigContext } from 'contexts/ConfigContext';
// utils
import getProductLinks from 'utils/config/getProductLinks';
import {
  getTriggersToSave,
  getTriggersToUpdate,
  isTriggerId,
} from 'pages/Notifications/utils/triggerUtils';
// redux
import { getSPSAlertsConfig } from 'reducers/config/actions';
import handleRequestError from 'reducers/auth/handleRequestError';
// api
import { saveAlert, updateAlert } from 'api/Notification/alert';
import { removeRecipients, saveRecipients } from 'api/Notification/recipient';
import {
  removeVariantLinks,
  saveVariantLinks,
} from 'api/Notification/variantLinks';
import {
  removeTriggers,
  saveTriggers,
  updateTriggers,
} from 'api/Notification/trigger';
import { removeBrands, saveBrands } from 'api/Notification/brand';
import { removeCategories, saveCategories } from 'api/Notification/category';
import { removeRetailers, saveRetailers } from 'api/Notification/retailer';
// @types
import {
  BrandItemRequest,
  CategoryItemRequest,
  Recipient,
  RetailerItemRequest,
  VariantLinkItemRequest,
} from 'types/Notification';
import initialAlertForm from './utils/initialAlertForm';
import ErrorSnackbar from '../../components/ErrorSnackbar/ErrorSnackbar';
import NotificationForm from './components/NotificationForm/NotificationForm';
import CustomStepper from './components/NotificationForm/components/CustomStepper/CustomStepper';
import useSavedAlert from './hooks/useSavedAlert';
import useCustomCategoriesFilters from './hooks/useCustomCategoriesFilters';
import useSteps from './hooks/useSteps';

type Props = RouteComponentProps<{ id?: string }> & { edit?: boolean };

// parts of alert:
// - useSteps
// - useCustomCategoriesFilters
// - useTriggers
// - useAlertForm

const Notification: React.FC<Props> = ({ match, edit = false }) => {
  let finalErrorMessage = '';

  const dispatch = useDispatch();
  const { configId } = useContext(ConfigContext);

  const [snackbar, setSnackbar] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<boolean>(false);

  type NullableTrigger = TriggerOption | undefined | null;

  const [trigger, setTrigger] = useState<NullableTrigger>(null);
  const [alertSaving, setAlertSaving] = useState<boolean>(false);

  const accessToken = useSelector((state) => state.auth.configAccessToken);
  const domainName = useSelector(
    (state) => state.config.config.domainName || ''
  );

  const spsConfig = useSelector((state) => state.config.sps);

  const productLinks = useMemo(() => getProductLinks(spsConfig), [spsConfig]);

  const customCategoriesFilters = useCustomCategoriesFilters();
  const {
    state: { filters: customFilters },
    handleResetFilters,
  } = customCategoriesFilters;

  const triggers = useTriggers({
    fields: {},
    idsToAdd: [],
    idsToUpdate: [],
    idsToRemove: [],
    invalidIds: [],
  });
  const {
    state: triggersState,
    triggerFields,
    validateTriggers,
    handleResetTriggers,
  } = triggers;

  const alertForm = useAlertForm(initialAlertForm, customFilters);
  const {
    alert,
    handleResetAlertForm,
    handleValidateSettings,
    handleValidateProducts,
    refreshKey,
    settingsErrors,
    productsErrors,
    errorMessage,
  } = alertForm;

  finalErrorMessage = errorMessage;

  if (triggersState.invalidIds.length > 0) {
    finalErrorMessage = 'Mandatory information is missing';
  }

  const isEptyFilter = useMemo(() => {
    if (
      alert.type === 'category' &&
      customFilters.filter(Boolean).length === 0
    ) {
      return true;
    }

    return false;
  }, [alert.type, customFilters]);

  if (isEptyFilter) {
    finalErrorMessage = 'Mandatory information is missing';
  }

  const steps = useSteps(
    settingsErrors,
    productsErrors,
    triggersState.invalidIds
  );

  const { handleResetSteps } = steps;

  // alert actions
  const {
    alertId,
    alertLoading,
    alertLoadingError,
    initialBrands,
    initialCategories,
    initialRecipients,
    initialRetailers,
    initialVariantLinks,
  } = useSavedAlert(match.params.id, alertForm, triggers);

  const isFormValid = useCallback((): boolean => {
    const step1Valid = handleValidateSettings(domainName);
    const step2Valid = validateTriggers();
    const step3Valid = handleValidateProducts();

    if (isEptyFilter) {
      return false;
    }

    if (!step1Valid || !step2Valid || !step3Valid) {
      return false;
    }

    return true;
  }, [
    isEptyFilter,
    domainName,
    handleValidateProducts,
    handleValidateSettings,
    validateTriggers,
  ]);

  // save alert
  const handleSave = useCallback(
    async (saveCallback: () => void) => {
      if (alert) {
        const isValid = isFormValid();

        if (!isValid) {
          return;
        }

        setRequestError(false);
        setAlertSaving(true);
        try {
          await saveAlert(accessToken, configId, {
            ...alert,
            triggers: triggerFields,
          });

          if (saveCallback) {
            saveCallback();
          }
        } catch (error) {
          dispatch(handleRequestError(error, 'saveAlert'));
          setRequestError(true);
        } finally {
          setAlertSaving(false);
        }
      }
    },
    [accessToken, configId, alert, dispatch, triggerFields, isFormValid]
  );

  const handleUpdateTriggers = useCallback(async () => {
    if (alertId) {
      const { idsToAdd, idsToUpdate, idsToRemove, fields } = triggersState;

      const triggersToSave = getTriggersToSave(fields, idsToAdd);
      const triggersToUpdate = getTriggersToUpdate(fields, idsToUpdate);

      if (triggersToSave.length) {
        await saveTriggers(accessToken, alertId, triggersToSave);
      }

      if (triggersToUpdate.length) {
        await updateTriggers(accessToken, alertId, triggersToUpdate);
      }

      if (idsToRemove.length) {
        const filteredIdsToRemove = idsToRemove.filter(isTriggerId);
        await removeTriggers(accessToken, alertId, filteredIdsToRemove);
      }
    }
  }, [accessToken, alertId, triggersState]);

  // update alert
  const handleUpdate = useCallback(
    async (updateCallback: () => void) => {
      if (alertId) {
        const isValid = isFormValid();

        if (!isValid) {
          return;
        }

        try {
          setAlertSaving(true);
          setRequestError(false);

          // base alert data
          await updateAlert(accessToken, alertId, alert);

          // emails
          if (alert.recipients && initialRecipients) {
            const { added: addedRecipients, removed: removedRecipients } =
              getDifference<Recipient>(
                alert.recipients,
                initialRecipients,
                'email'
              );

            await saveRecipients(accessToken, alertId, addedRecipients);
            await removeRecipients(
              accessToken,
              alertId,
              removedRecipients.map((r) => Number(r.id))
            );
          }

          // products
          const { type } = alert;

          if (alert.variantLinks && type === 'product') {
            // eslint-disable-next-line max-len
            const { added: addedVariantLinks, removed: removedVariantLinks } =
              getDifference<VariantLinkItemRequest>(
                alert.variantLinks,
                initialVariantLinks,
                'variantLinkId'
              );

            if (addedVariantLinks.length) {
              await saveVariantLinks(accessToken, alertId, addedVariantLinks);
            }

            if (removedVariantLinks.length) {
              await removeVariantLinks(
                accessToken,
                alertId,
                removedVariantLinks
              );
            }
          }

          if (alert.brands && type === 'category') {
            const { added: addedBrands, removed: removedBrands } =
              getDifference<BrandItemRequest>(
                alert.brands,
                initialBrands,
                'brandId'
              );

            if (addedBrands.length) {
              await saveBrands(accessToken, alertId, addedBrands);
            }

            if (removedBrands.length) {
              await removeBrands(accessToken, alertId, removedBrands);
            }
          }

          if (alert.categories && type === 'category') {
            // eslint-disable-next-line max-len

            const { added: addedCategories, removed: removedCategories } =
              getDifference<CategoryItemRequest>(
                alert.categories,
                initialCategories,
                'categoryId'
              );

            if (addedCategories.length) {
              await saveCategories(accessToken, alertId, addedCategories);
            }

            if (removedCategories.length) {
              await removeCategories(accessToken, alertId, removedCategories);
            }
          }

          if (alert.retailers && type === 'category') {
            // eslint-disable-next-line max-len
            const { added: addedReteilers, removed: removedReteilers } =
              getDifference<RetailerItemRequest>(
                alert.retailers,
                initialRetailers,
                'retailerId'
              );

            if (addedReteilers.length) {
              await saveRetailers(accessToken, alertId, addedReteilers);
            }

            if (removedReteilers.length) {
              await removeRetailers(accessToken, alertId, removedReteilers);
            }
          }

          // remove alerts based on type
          if (type === 'product' || type === 'all') {
            if (initialBrands.length) {
              await removeBrands(accessToken, alertId, initialBrands);
            }
            if (initialCategories.length) {
              await removeCategories(accessToken, alertId, initialCategories);
            }
            if (initialRetailers.length) {
              await removeRetailers(accessToken, alertId, initialRetailers);
            }
          }

          if (type === 'category' || type === 'all') {
            if (initialVariantLinks.length) {
              await removeVariantLinks(
                accessToken,
                alertId,
                initialVariantLinks
              );
            }
          }

          // triggers
          await handleUpdateTriggers();

          // redirect
          if (updateCallback) {
            updateCallback();
          }
        } catch (error) {
          dispatch(handleRequestError(error, 'updateAlert'));
          setRequestError(true);
        } finally {
          setAlertSaving(false);
        }
      }
    },
    [
      accessToken,
      alert,
      alertId,
      dispatch,
      initialBrands,
      initialCategories,
      initialRecipients,
      initialRetailers,
      initialVariantLinks,
      handleUpdateTriggers,
      isFormValid,
    ]
  );

  // clear form state
  useEffect(() => {
    handleResetAlertForm(initialAlertForm);
  }, [handleResetAlertForm]);

  // validations on step change
  useEffect(() => {
    if (steps.step > 0) {
      handleValidateSettings(domainName);
    }

    if (steps.step > 1) {
      validateTriggers();
    }
  }, [domainName, handleValidateSettings, validateTriggers, steps.step]);

  // get brands, categories, retailers, products
  useEffect(() => {
    if (configId) {
      dispatch(getSPSAlertsConfig(configId));
    }
  }, [dispatch, configId]);

  // reset form on config change
  useEffect(() => {
    handleResetSteps();
    handleResetFilters();
    handleResetTriggers();
    handleResetAlertForm(initialAlertForm);
  }, [configId]);

  if (edit === true && !match.params.id) {
    return <Redirect to="/price-analysis/alerts/create" />;
  }

  if (alertLoadingError) {
    return (
      <Redirect
        to={{
          pathname: '/price-analysis/alerts',
          state: { error: 'Such notification does not exist in the system.' },
        }}
      />
    );
  }

  const isUpdate = !!alertId;

  return (
    <Page
      title=""
      renderNav={() =>
        !isUpdate
          ? CustomStepper({
              step: steps.step,
              steps: steps.steps,
            })
          : null
      }
      navMargin="26px 0 0 0"
    >
      {finalErrorMessage ? (
        <ErrorSnackbar
          isOpen={snackbar}
          setOpen={setSnackbar}
          message={finalErrorMessage}
        />
      ) : null}
      <ErrorSnackbar
        isOpen={requestError}
        setOpen={setRequestError}
        message="Oops, something went wrong. Please try again later."
      />
      <NotificationForm
        action={alertId ? 'update' : 'save'}
        handleSave={handleSave}
        handleUpdate={handleUpdate}
        alertLoading={alertLoading}
        alertSaving={alertSaving}
        setTrigger={setTrigger}
        trigger={trigger}
        alertForm={alertForm}
        key={refreshKey}
        setSnackbar={setSnackbar}
        steps={steps}
        domainName={domainName}
        productLinks={productLinks}
        customCategoriesFilters={customCategoriesFilters}
        settingsErrors={settingsErrors}
        productsErrors={productsErrors}
        triggers={triggers}
        finalErrorMessage={finalErrorMessage}
      />
    </Page>
  );
};

export default Notification;
