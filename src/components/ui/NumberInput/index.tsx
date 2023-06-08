import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IMaskInput } from 'react-imask';

import { cn } from '@/utils/tailwind';

export interface NumberInputProps {
  name: string;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  value: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInvalid?: boolean;
}

const NumberInput = (props: NumberInputProps) => {
  const {
    max = Number.MAX_SAFE_INTEGER,
    min = 0,
    onChange,
    name,
    isDisabled,
    isRequired,
    isInvalid,
    value: initialValue,
  } = props;
  const [value, setValue] = useState(initialValue.toString());
  const ref = useRef(null);

  const updateValue = (newValue: number) => {
    setValue(newValue.toString());
    if (onChange) onChange(newValue);
    if (ref.current.maskRef) {
      ref.current.maskRef.value = newValue.toString();
      ref.current.maskRef._onChange();
    }
  };

  const onIncrementClick = (value: string) => {
    const newValue = parseInt(value, 10) + 1;
    if (newValue > max) return;

    updateValue(newValue);
  };

  const onDecrementClick = (value: string) => {
    const newValue = parseInt(value, 10) - 1;
    if (newValue < min) return;

    updateValue(newValue);
  };

  const onInputBlur = (event) => {
    const newValue = parseInt(event.target.value);

    if (newValue > max) {
      updateValue(max);
      return;
    }

    if (newValue < min || isNaN(newValue)) {
      updateValue(min);
      return;
    }

    updateValue(newValue);
  };

  return (
    <div
      className={cn('flex text-foreground-subtle', {
        'text-negative-main': isInvalid,
      })}
    >
      <button
        className={cn(
          'inline-flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-l-lg border border-r-0 border-background-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          { 'border-negative-main': isInvalid },
        )}
        type="button"
        onClick={() => onDecrementClick(value)}
        disabled={isDisabled}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <IMaskInput
        ref={ref}
        mask={Number}
        scale={0}
        type="tel"
        defaultValue={initialValue}
        onBlur={onInputBlur}
        onAccept={(newValue: string) => {
          setValue(newValue);
          if (onChange) onChange(parseInt(newValue, 10));
        }}
        name={name}
        id={name}
        disabled={isDisabled}
        aria-invalid={isInvalid}
        aria-required={isRequired}
        className={cn(
          'w-[calc(100%_-_80px)] border border-x-0 border-background-max text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          { 'border-negative-main': isInvalid },
        )}
      />
      <button
        className={cn(
          'inline-flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-r-lg border border-l-0 border-background-max focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          { 'border-negative-main': isInvalid },
        )}
        type="button"
        disabled={isDisabled}
        onClick={() => onIncrementClick(value)}
      >
        <FontAwesomeIcon className="text-foreground-subtle" icon={faPlus} />
      </button>
    </div>
  );
};

export { NumberInput };
