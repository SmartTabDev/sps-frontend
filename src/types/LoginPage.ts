export type Field = 'Email' | 'Password' | 'NewPassword' | 'ConfirmPassword'

export type LoginPage = {
  header: {
    bigText: string;
    smallText: string;
  };
  form?: Field[];
  button: string;
  action: any;
  actions: boolean;
  footer: boolean;
  justifyContent?: string;
  backToLogin?: boolean;
  loading?:false;
};
