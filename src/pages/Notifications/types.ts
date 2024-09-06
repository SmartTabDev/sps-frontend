export type Action = {
    text: string;
    handleClick?: () => void;
    redirectTo?: string;
    disabled?: boolean;
    showSnackbar?: boolean;
    error?: boolean;
    handleError?: () => void;
    isLoading?: boolean;
  };

export type ActionProps = { action?: Action };

type Total = {
  name: string;
  value: number;
  button?: string;
  onButtonClick?: () => void;
  error?: boolean;
};

export type Totals = Total[];
