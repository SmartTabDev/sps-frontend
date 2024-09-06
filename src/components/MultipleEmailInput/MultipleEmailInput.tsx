import React, { useCallback, useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { styled, css } from '@mui/system';
import { Recipient } from 'types/Notification';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import uniqBy from 'lodash/uniqBy';
import truncate from 'lodash/truncate';
import { validateEmails } from 'pages/Notifications/hooks/useAlertForm';
import { ReactComponent as Times } from './times-circle-regular.svg';
import { InputProps } from '../Input';

// https://trello.com/c/KzfzBC34/989-alerts-email-validation - requirements

type TextFieldWrapperProps = {
  rows: number;
};

const Item = styled('div', {
  shouldForwardProp: (props) => props !== 'error',
})<{ error?: boolean }>`
  margin-right: 5px;
  margin-bottom: 3px;
  background: ${({ theme }) => theme.palette.common.white};
  border: 2px solid rgba(82, 95, 129, 0.3);
  border-radius: 20px;
  padding: 5px 10px 5px 10px;
  font-size: 14px;
  max-height: 30px;
  z-index: 1000;
  display: flex;
  align-items: center;
  margin-top: 5px;

  > button {
    outline: 0;
    height: 16px;
    width: 16px;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin-left: 8px;
  }

  ${({ error }) =>
    error &&
    css`
      color: #f00f00;
      border: 2px solid #f00f00;

      > button svg {
        color: #f00f00;
      }
    `};
`;

const TextFieldWrapper = styled('div', {
  shouldForwardProp: (props) => props !== 'valid' && props !== 'error',
})<InputProps & TextFieldWrapperProps>`
  position: relative;
  color: #3b455e;

  .MuiInputBase-input {
    min-height: 76px;
    padding-top: 60px;
    ${({ rows }) =>
      rows &&
      css`
        padding-top: calc(${rows} * 30px + 60px) !important;
      `}

  ${({ valid }) =>
    valid &&
    css`
      label {
        color: #28a745;
      }

      label + div:before {
        color: #28a745;
        border-bottom-width: 2px;
      }
    `};

  ${({ error }) =>
    error &&
    css`
      label {
        color: #f00f00;
      }

      label + div:before {
        color: #f00f00;
        border-bottom-width: 2px;
      }
    `};
`;

const ItemsWrapper = styled('div')`
  padding: 50px 10px 10px 10px;
  height: calc(100% - 10px);
  width: calc(100% - 10px);
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export type Props = {
  placeholder?: string;
  label?: string;
  domainName?: string;
  emails: Recipient[] | undefined;
  error: string | undefined;
  setEmails: (value: Recipient[] | undefined) => void;
  handleValidate: (value: string | undefined, options: any) => boolean;
};

const MultipleEmailInput: React.FC<Props> = ({
  placeholder,
  label,
  domainName,
  emails: items = [],
  error,
  setEmails: setItems,
  handleValidate,
}) => {
  const [value, setValue] = useState<string>('');

  const handleKeyDown = (event: any) => {
    if (['Enter', 'Tab', ',', ';'].includes(event.key)) {
      event.preventDefault();

      const cleanValue = value.trim();

      // handle pasted emails
      if (cleanValue.includes(',')) {
        const newEmais = cleanValue.split(',').map((email) => ({ email }));
        // omit duplicates
        const filteredEmails = newEmais.filter(
          (email) =>
            items.find((item) => item.email === email.email) === undefined
        );

        if (filteredEmails.length > 0) {
          setItems([...items, ...filteredEmails]);
          setValue('');
          return;
        }
      }

      // handle single email
      if (cleanValue) {
        const isValid = handleValidate(cleanValue, {
          emails: items,
          domainName,
        });

        if (isValid) {
          setItems([...items, { email: cleanValue }]);
          setValue('');
        }
      }
    }
  };

  const handleDelete = (item: string) => {
    setItems(items.filter((i) => i.email !== item));
  };

  const handlePaste = (event: any) => {
    event.preventDefault();

    const clipboardData = event.clipboardData.getData('text');
    const pasted = clipboardData
      .split(/(?:,|;|\s)+/)
      .map((e: any) => e.trim().toLowerCase());

    if (pasted) {
      const toAdd = pasted.filter(Boolean).join(',');

      setValue(toAdd);
    }
  };

  const uniqueEmails = useMemo(() => uniqBy(items, 'email'), [items]);

  const validateItems = useCallback(() => {
    if (uniqueEmails.length) {
      handleValidate('', { emails: uniqueEmails, domainName });
    }
  }, [handleValidate, uniqueEmails, domainName]);

  useEffect(() => {
    validateItems();
  }, [validateItems, value]);

  const isError = Boolean(error);
  const charsSum = items.join().length;
  const rows = Math.round(charsSum / 32);

  const { invalidEmails } = validateEmails(value, {
    domainName: domainName!,
    emails: items,
  });

  return (
    <>
      <TextFieldWrapper error={isError} valid={!isError} rows={rows}>
        <ItemsWrapper>
          {uniqueEmails.map((item) => {
            const { email } = item;
            const isInvalid = invalidEmails.includes(email);

            return (
              <Item key={email} error={isInvalid}>
                {truncate(email)}
                <button
                  type="button"
                  className="button"
                  onClick={() => handleDelete(email)}
                >
                  <Times />
                </button>
              </Item>
            );
          })}
        </ItemsWrapper>
        <FormControl variant="filled" fullWidth margin="dense">
          <TextField
            error={isError}
            value={value}
            label={label}
            placeholder={placeholder}
            variant="filled"
            fullWidth
            onChange={(e) => setValue(e.currentTarget.value.toLowerCase())}
            onKeyDown={(e) => handleKeyDown(e)}
            onPaste={(e) => handlePaste(e)}
            id="emails"
            type="text"
            focused={uniqueEmails.length > 0}
          />
          <FormHelperText id="emails" error={isError}>
            {error}
            {!isError &&
              'Mandatory. Email addresses specified here will be used to send the notifications to.'}
          </FormHelperText>
        </FormControl>
      </TextFieldWrapper>
    </>
  );
};

export default MultipleEmailInput;
