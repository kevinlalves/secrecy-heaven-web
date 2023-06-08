import { ElementType, ForwardRefRenderFunction, RefCallback, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
};

const MoneyMask: ForwardRefRenderFunction<HTMLElement, CustomProps> = (props, ref) => {
  const { onChange, value, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="R$ num"
      blocks={{
        num: {
          mask: Number,
          thousandsSeparator: '.',
          padFractionalZeros: true,
          radix: ',',
          mapToRadix: [','],
          scale: 2,
          normalizeZeros: true,
        },
      }}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => onChange({ target: { name: props.name, value: value as string } })}
      defaultValue={value}
    />
  );
};

export default forwardRef(MoneyMask) as ElementType;
