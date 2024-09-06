import { getAlert } from 'api/Notification/alert';
import { AlertActionType, UseAlertForm } from 'pages/Notifications/hooks/useAlertForm';
import { TriggerActionType, UseTriggers } from 'pages/Notifications/hooks/useTriggers';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import {
  BrandItemRequest,
  CategoryItemRequest,
  Recipient,
  RetailerItemRequest,
  VariantLinkItemRequest,
} from 'types/Notification';
import mapRawAlert from '../utils/mapRawAlert';
import mapRawTriggers from '../utils/mapRawTriggers';

type UseSavedAlert = {
  alertId: number | null;
  alertLoading: boolean;
  alertLoadingError: boolean;
  initialRecipients: Recipient[] | undefined;
  initialVariantLinks: VariantLinkItemRequest[];
  initialCategories: CategoryItemRequest[];
  initialBrands: BrandItemRequest[];
  initialRetailers: RetailerItemRequest[];
};

const useSavedAlert = (
  id: string | undefined,
  alertForm: UseAlertForm,
  triggers: UseTriggers,
): UseSavedAlert => {
  const [alertId, setAlertId] = useState<number | null>(null);
  const [alertLoading, setAlertLoading] = useState<boolean>(false);
  const [alertLoadingError, setAlertLoadingError] = useState<boolean>(false);

  const [initialRecipients, setIRecipients] = useState<Recipient[] | undefined>(undefined);
  const [initialVariantLinks, setIVariantLinks] = useState<VariantLinkItemRequest[]>([]);
  const [initialCategories, setICategories] = useState<CategoryItemRequest[]>([]);
  const [initialBrands, setIBrands] = useState<BrandItemRequest[]>([]);
  const [initialRetailers, setIRetailers] = useState<RetailerItemRequest[]>([]);

  const { dispatch: alertFormDispatch } = alertForm;
  const { dispatch: triggerDispatch } = triggers;

  const accessToken = useSelector((state) => state.auth.configAccessToken);
  const dispatch = useDispatch();

  const fetchAlert = useCallback(
    async (idToFetch: number) => {
      setAlertLoading(true);

      try {
        const data = await getAlert(accessToken, idToFetch);

        if (!data) {
          dispatch(handleRequestError('missing data', 'getAlert'));
          return;
        }

        const fetchedAlert = mapRawAlert(data);
        const fields = mapRawTriggers(data);

        triggerDispatch({
          type: TriggerActionType.LOAD,
          payload: {
            value: fields,
          },
        });

        setIRecipients(data.recipients);
        setIVariantLinks(data.variantLinks || []);
        setICategories(data.categories || []);
        setIRetailers(data.retailers || []);
        setIBrands(data.brands || []);

        alertFormDispatch({
          type: AlertActionType.LOAD,
          payload: fetchedAlert,
        });
      } catch (error) {
        dispatch(handleRequestError(error, 'getAlert'));
        setAlertLoadingError(true);
      } finally {
        setAlertLoading(false);
      }
    },
    [accessToken, triggerDispatch, alertFormDispatch, dispatch],
  );

  // fetch alert when id is provided
  useEffect(() => {
    if (id) {
      const nId = Number(id);
      setAlertId(nId);
      fetchAlert(nId);
    }
  }, [fetchAlert, id]);

  return {
    alertId,
    alertLoading,
    alertLoadingError,
    initialRecipients,
    initialVariantLinks,
    initialCategories,
    initialBrands,
    initialRetailers,
  };
};

export default useSavedAlert;
