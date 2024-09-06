import { useCallback, useState, useReducer, useMemo } from 'react';
import * as EmailValidator from 'email-validator';
import truncate from 'lodash/truncate';
import uniq from 'lodash/uniq';
import moment from 'moment';
import {
  Alert,
  AlertType,
  BrandItemRequest,
  CategoryItemRequest,
  Recipient,
  RetailerItemRequest,
  VariantLinkItemRequest,
} from 'types/Notification';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { AlertProductFilters } from '../pages/Notification/hooks/useCustomCategoriesFilters';

export type AlertState = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  name: string | undefined;
  description: string | undefined;
  emails: Recipient[] | undefined;
  isActive: boolean;
  availableOnly: boolean;
  sensitivity: 'any' | 'specyfic' | undefined;
  alertType: AlertType;
  variantLinks: GridRowSelectionModel;
  brands: GridRowSelectionModel;
  categories: GridRowSelectionModel;
  retailers: GridRowSelectionModel;
};

export type AlertStateErrors = {
  [K in keyof AlertState]?: string;
};

export type SettingsErrors = Pick<
  AlertStateErrors,
  'name' | 'description' | 'emails'
>;
export type ProductsErrors = Pick<
  AlertStateErrors,
  'retailers' | 'categories' | 'brands'
>;

export type FormState = {
  fields: AlertState;
  errors: AlertStateErrors;
};

type Validations = {
  [K in keyof AlertState]?: any;
};

export enum AlertActionType {
  RESET = 'RESET',
  SET = 'SET',
  VALIDATE = 'VALIDATE',
  LOAD = 'LOAD',
}

const formatErrorValues = (values: (string | undefined)[]) => {
  const truncated = values.map((v) => truncate(v));
  const sliced = truncated.slice(0, 3).join(', ');

  return sliced;
};

type EmailValidationOptions = {
  emails: { email: string }[];
  domainName: string;
};

export const validateEmails = (
  value: string | undefined,
  options: EmailValidationOptions
): any => {
  let errorMessage = '';
  let invalidEmails: any[] = [];
  let firstError = '';

  const { emails, domainName } = options;

  let domainNames: string[] = [];

  if (domainName) {
    domainNames = domainName.includes(',')
      ? domainName.split(',')
      : [domainName];
  }

  let valueEmails: string[] = value ? [value] : [];
  let finalEmails = [{ email: value }];

  if (value && value.includes(',')) {
    valueEmails = value.split(',').map((v) => v.trim());
    finalEmails = valueEmails.map((v) => ({ email: v }));
  }

  const allEmails = [...emails, ...finalEmails]
    .filter(Boolean)
    .filter(({ email }) => email && email.length > 0);

  if (emails.length === 0 && value === '') {
    errorMessage = 'Mandatory';

    if (!firstError) {
      firstError = errorMessage;
    }
  }

  const wrongEmailValues = [...allEmails]
    .filter(Boolean)
    .filter(({ email }) => !EmailValidator.validate(email!))
    .map(({ email }) => email);

  if (wrongEmailValues.length > 0) {
    errorMessage = `${`${formatErrorValues(
      wrongEmailValues
    )} contains errors.`}`;

    if (!firstError) {
      firstError = errorMessage;
    }

    invalidEmails = [...invalidEmails, ...wrongEmailValues];
  }

  const duplicates = [...allEmails]
    .filter(
      ({ email: e }, i, a) =>
        a.map(({ email }) => email!.toLowerCase()).indexOf(e!.toLowerCase()) !==
        i
    )
    .map(({ email }) => email);

  if (duplicates.length > 0) {
    errorMessage = `${`${formatErrorValues(
      duplicates
    )} has already been added.`}`;

    if (!firstError) {
      firstError = errorMessage;
    }

    invalidEmails = [...invalidEmails, ...duplicates];
  }

  const wrongEmailsByDomainNames: string[] = [];
  allEmails.filter(Boolean).forEach(({ email }) => {
    const matchedDomainNames = [];
    domainNames.forEach((dn) => {
      if (email!.includes(dn)) {
        matchedDomainNames.push(email as string);
      }
    });

    if (matchedDomainNames.length === 0) {
      wrongEmailsByDomainNames.push(email as string);
    }
  });

  if (wrongEmailsByDomainNames.length > 0 && domainNames.length) {
    errorMessage = `${`${formatErrorValues(
      wrongEmailsByDomainNames
    )} should end with ${domainNames.join(', ')} domain.`}`;

    if (!firstError) {
      firstError = errorMessage;
    }

    invalidEmails = [...invalidEmails, ...wrongEmailsByDomainNames];
  }

  if (firstError) {
    return {
      error: firstError,
      invalidEmails: uniq(invalidEmails),
    };
  }

  return {
    error: errorMessage,
    invalidEmails: [],
  };
};

export const validations: Validations = {
  description: (value: string): string => {
    if (value.length > 250) {
      return 'Max 250 characters including spaces';
    }

    return '';
  },
  name: (value: string | undefined): string => {
    if (!value) {
      return 'Mandatory';
    }

    return '';
  },
  emails: (
    value: string | undefined,
    options: EmailValidationOptions
  ): string => {
    const { error } = validateEmails(value, options);

    return error;
  },
  brands: (value: GridRowSelectionModel): string =>
    value.length === 0 ? 'Please select your filters' : '',
  categories: (value: GridRowSelectionModel): string =>
    value.length === 0 ? 'Please select your filters' : '',
  retailers: (value: GridRowSelectionModel): string =>
    value.length === 0 ? 'Please select your filters' : '',
};

type ResetAction = {
  type: AlertActionType.RESET;
  payload: AlertState;
};

type SetActions<S> = {
  type: AlertActionType.SET;
  payload: { [K in keyof S]: { key: K; value: S[K] } }[keyof S];
};

type ValidateActions<S> = {
  type: AlertActionType.VALIDATE;
  payload: {
    [K in keyof S]?: string;
  };
};

type LoadAction = {
  type: AlertActionType.LOAD;
  payload: AlertState;
};

type Actions<S> = SetActions<S> | ResetAction | LoadAction | ValidateActions<S>;

const createAlertReducer =
  () =>
  (state: FormState, action: Actions<AlertState>): FormState => {
    switch (action.type) {
      case AlertActionType.RESET:
        return {
          ...state,
          fields: { ...action.payload },
          errors: {},
        };

      case AlertActionType.SET:
        return {
          ...state,
          fields: {
            ...state.fields,
            [action.payload.key]: action.payload.value,
          },
        };

      case AlertActionType.VALIDATE:
        return {
          ...state,
          errors: {
            ...state.errors,
            ...action.payload,
          },
        };

      case AlertActionType.LOAD:
        return {
          ...state,
          fields: { ...action.payload },
        };
      default:
        return state;
    }
  };

export interface UseAlertForm {
  alert: Alert;
  state: FormState;
  handleResetAlertForm: (initialState: AlertState) => void;
  handleSet: (payload: SetActions<AlertState>['payload']) => void;
  handleValidate: (
    payload: ValidateActions<AlertState>['payload'],
    options?: any
  ) => boolean;
  handleValidateSettings: (domainName: string) => boolean;
  handleValidateProducts: () => boolean;
  cleanProductsValidation: () => void;
  dispatch: React.Dispatch<Actions<AlertState>>;
  refreshKey: string;
  settingsErrors: SettingsErrors;
  productsErrors: ProductsErrors;
  errorMessage: string;
}

const useAlertForm = (
  initialState: AlertState,
  customFilters: AlertProductFilters[]
): UseAlertForm => {
  const initialFormState: FormState = { fields: initialState, errors: {} };
  const [refreshKey, setRefreshKey] = useState<number>(1);
  const filterReducer = createAlertReducer();
  const [state, dispatch] = useReducer(filterReducer, initialFormState);

  const handleResetAlertForm = useCallback((payload: AlertState) => {
    setRefreshKey((key) => key + 1);

    dispatch({
      type: AlertActionType.RESET,
      payload,
    });
  }, []);

  const handleSet = useCallback(
    (payload: SetActions<AlertState>['payload']) => {
      dispatch({
        type: AlertActionType.SET,
        payload,
      });
    },
    []
  );

  const handleValidate = useCallback(
    (payload: ValidateActions<AlertState>['payload'], options?: any) => {
      const key = Object.keys(payload)[0] as keyof AlertState;

      if (key) {
        const validation = validations[key](payload[key], options);

        dispatch({
          type: AlertActionType.VALIDATE,
          payload: {
            [key]: validation,
          },
        });

        return validation === ''; // isValid
      }

      return true; // isValid
    },
    []
  );

  // used on tab change and in the form submit
  const handleValidateSettings = useCallback(
    (domainName: string): boolean => {
      const { name, description, emails } = state.fields;

      const nameValidation = validations.name(name);
      dispatch({
        type: AlertActionType.VALIDATE,
        payload: {
          name: nameValidation || '',
        },
      });

      const descriptionValidation = validations.description(description);
      dispatch({
        type: AlertActionType.VALIDATE,
        payload: {
          description: descriptionValidation || '',
        },
      });

      const emailsValidation = validations.emails('', {
        emails: (emails || []).map((r) => r.email),
        domainName,
      });

      dispatch({
        type: AlertActionType.VALIDATE,
        payload: {
          emails: emailsValidation || '',
        },
      });

      return (
        nameValidation === '' &&
        descriptionValidation === '' &&
        emailsValidation === ''
      );
    },
    [state.fields]
  );

  // used in the form submit
  const handleValidateProducts = useCallback((): boolean => {
    const { retailers, categories, brands, alertType } = state.fields;

    // save all products/selected products option
    if (alertType !== 'category') {
      return true;
    }

    let isCustomCategoriesValid = true;

    const brandsValidation = customFilters.find((f) => f === 'brand')
      ? validations.brands(brands)
      : '';
    isCustomCategoriesValid =
      isCustomCategoriesValid && brandsValidation === '';

    dispatch({
      type: AlertActionType.VALIDATE,
      payload: {
        brands: brandsValidation || '',
      },
    });

    const categoriesValidation = customFilters.find((f) => f === 'category')
      ? validations.categories(categories)
      : '';
    isCustomCategoriesValid =
      isCustomCategoriesValid && categoriesValidation === '';

    dispatch({
      type: AlertActionType.VALIDATE,
      payload: {
        categories: categoriesValidation || '',
      },
    });

    const retailersValidation = customFilters.find((f) => f === 'retailer')
      ? validations.retailers(retailers)
      : '';
    isCustomCategoriesValid =
      isCustomCategoriesValid && retailersValidation === '';

    dispatch({
      type: AlertActionType.VALIDATE,
      payload: {
        retailers: retailersValidation || '',
      },
    });

    // don't save custom categories without filters
    if (customFilters.filter(Boolean).length === 0) {
      return false;
    }

    return isCustomCategoriesValid;
  }, [state.fields, customFilters]);

  // used while radio button changed
  const cleanProductsValidation = useCallback((): void => {
    // clean all validations
    dispatch({
      type: AlertActionType.VALIDATE,
      payload: {
        brands: '',
      },
    });

    dispatch({
      type: AlertActionType.VALIDATE,
      payload: {
        categories: '',
      },
    });

    dispatch({
      type: AlertActionType.VALIDATE,
      payload: {
        retailers: '',
      },
    });
  }, []);

  const settingsErrors: SettingsErrors = {
    description: state.errors.description,
    name: state.errors.name,
    emails: state.errors.emails,
  };

  const productsErrors: ProductsErrors = {
    brands: state.errors.brands,
    categories: state.errors.categories,
    retailers: state.errors.retailers,
  };

  const settingError = Object.values(settingsErrors).filter(Boolean).length > 0;
  const productsError =
    Object.values(productsErrors).filter(Boolean).length > 0;

  let errorMessage = '';

  if (productsError) {
    errorMessage = 'Please select your filters';
  }

  if (settingError) {
    errorMessage = 'Mandatory information is missing.';
  }

  const {
    emails,
    variantLinks: variantLinkIds,
    retailers: retailerIds,
    brands: brandIds,
    categories: categoryIds,
    name,
    description,
    startDate,
    endDate,
    isActive,
    availableOnly,
    alertType,
  } = state.fields;

  const recipients: Recipient[] | undefined = useMemo(() => {
    const result: Alert['recipients'] = emails
      ? emails.map((e) => ({ email: e.email }))
      : undefined;

    return result;
  }, [emails]);

  const variantLinks: VariantLinkItemRequest[] = useMemo(
    () =>
      variantLinkIds.map((v) => ({
        variantLinkId: Number(v),
      })),
    [variantLinkIds]
  );

  const retailers: RetailerItemRequest[] = useMemo(
    () =>
      retailerIds.map((v) => ({
        retailerId: Number(v),
      })),
    [retailerIds]
  );

  const brands: BrandItemRequest[] = useMemo(
    () => brandIds.map((v) => ({ brandId: Number(v) })),
    [brandIds]
  );

  const categories: CategoryItemRequest[] = useMemo(
    () =>
      categoryIds.map((v) => ({
        categoryId: Number(v),
      })),
    [categoryIds]
  );

  const alert = useMemo(() => {
    const result: Alert = {
      availableOnly,
      brands,
      categories,
      description,
      endDate: endDate?.toISOString() || null,
      isActive,
      name,
      recipients,
      retailers,
      startDate: startDate ? startDate.toISOString() : moment().toISOString(),
      type: alertType,
      variantLinks,
    };

    return result;
  }, [
    alertType,
    availableOnly,
    brands,
    categories,
    description,
    endDate,
    isActive,
    name,
    recipients,
    retailers,
    startDate,
    variantLinks,
  ]);

  return {
    alert,
    state,
    handleResetAlertForm,
    handleSet,
    handleValidate,
    handleValidateSettings,
    handleValidateProducts,
    cleanProductsValidation,
    dispatch,
    refreshKey: String(refreshKey),
    settingsErrors,
    productsErrors,
    errorMessage,
  };
};

export default useAlertForm;
