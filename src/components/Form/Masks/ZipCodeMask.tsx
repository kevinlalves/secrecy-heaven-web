import { ElementType, ForwardRefRenderFunction, RefCallback, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
};

const ZipCodeMask: ForwardRefRenderFunction<HTMLElement, CustomProps> = (props, ref) => {
  const { onChange, value, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="00000-000"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => onChange({ target: { name: props.name, value: value as string } })}
      defaultValue={value}
    />
  );
};

export default forwardRef(ZipCodeMask) as ElementType;
