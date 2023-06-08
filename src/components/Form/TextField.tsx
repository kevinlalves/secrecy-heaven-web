import { ElementType } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { MaskProps, Masks } from '@/components/Form/Masks';
import { FormControl, FormControlProps } from '../ui/FormControl';
import { Input, InputProps } from '../ui/Input';

type TextFieldProps = FormControlProps & InputProps & MaskProps;

const TextField = (props: TextFieldProps) => {
  const { control } = useFormContext();
  const { name, mask, onChange, label, caption, detail, isDisabled, isRequired, endAdornment, ...fieldProps } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange: onChangeHookForm, onBlur, ref },
        formState: { isSubmitted },
        fieldState: { isTouched, error },
      }) => {
        const hasError = error && (isTouched || isSubmitted);

        return (
          <FormControl
            name={name}
            label={label}
            detail={detail}
            caption={hasError ? error.message : caption}
            isDisabled={isDisabled}
            isInvalid={hasError}
          >
            <Input
              {...fieldProps}
              ref={ref}
              name={name}
              id={name}
              value={value || ''}
              onChange={(e) => {
                onChangeHookForm(e);

                if (onChange) onChange(e);
              }}
              onBlur={onBlur}
              isInvalid={hasError}
              isRequired={isRequired}
              disabled={isDisabled}
              type={props.type || 'text'}
              endAdornment={endAdornment}
              as={Boolean(mask) ? (Masks[mask] as ElementType<HTMLInputElement>) : 'input'}
            />
          </FormControl>
        );
      }}
    />
  );
};

TextField.displayName = 'TextField';

export { TextField };
