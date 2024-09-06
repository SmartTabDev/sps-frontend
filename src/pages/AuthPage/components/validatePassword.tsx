type Props = {
  password: string;
  requiredLength?: number;
};

export const validatePassword = ({
  password = '',
  requiredLength = 8,
}: Props): string | null => {
  let validLength = null;
  let hasNumber = null;
  let upperCase = null;
  let lowerCase = null;
  let specialChar = null;

  if (password) {
    validLength = password.length >= requiredLength;
    hasNumber = /\d/.test(password);
    upperCase = password.toLowerCase() !== password;
    lowerCase = password.toUpperCase() !== password;
    specialChar = /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password);
  } else {
    return null;
  }

  if (validLength === false) {
    return `Your password must be at least ${requiredLength} characters long.`;
  }

  if (lowerCase === false) {
    return 'Password must contain at least one lower letter (a-z)';
  }

  if (upperCase === false) {
    return 'Password must contain at least one uppercase letter (A-Z)';
  }

  if (hasNumber === false) {
    return 'Password must contain at least one number.';
  }

  if (specialChar === false) {
    return 'Password must contain at least one special character.';
  }

  return null;
};
