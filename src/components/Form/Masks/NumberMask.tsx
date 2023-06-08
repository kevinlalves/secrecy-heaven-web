import { ElementType, forwardRef, ForwardRefRenderFunction, RefCallback } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  precision?: number;
};

const NumberMask: ForwardRefRenderFunction<HTMLElement, CustomProps> = (props, ref) => {
  const { precision, onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask={Number}
      thousandsSeparator=""
      padFractionalZeros={false}
      radix="."
      mapToRadix={['.']}
      scale={precision || 2}
      normalizeZeros
      unmask="typed"
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => onChange({ target: { name: props.name, value: value as string } })}
    />
  );
};

export default forwardRef(NumberMask) as ElementType;
