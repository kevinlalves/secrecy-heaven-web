import { Controller, useFormContext } from 'react-hook-form';

import { FormControl, FormControlProps } from '../ui/FormControl';
import { NumberInput, NumberInputProps } from '../ui/NumberInput';

export type NumberFieldProps = FormControlProps &
  Omit<NumberInputProps, 'value'>;

const NumberField = (props: NumberFieldProps) => {
  const { control } = useFormContext();
  const {
    name,
    onChange,
    label,
    caption,
    detail,
    isDisabled,
    isRequired,
    ...fieldProps
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange: onChangeHookForm, ref },
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
            <NumberInput
              {...fieldProps}
              name={name}
              value={value || ''}
              onChange={(e) => {
                onChangeHookForm(e);

                if (onChange) onChange(e);
              }}
              isInvalid={hasError}
              isRequired={isRequired}
              isDisabled={isDisabled}
            />
          </FormControl>
        );
      }}
    />
  );
};

NumberField.displayName = 'NumberField';

export { NumberField };
