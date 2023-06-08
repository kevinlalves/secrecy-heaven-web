import { ElementType, ForwardRefRenderFunction, RefCallback, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  value: string;
  name: string;
};

const PhoneMask: ForwardRefRenderFunction<HTMLElement, CustomProps> = (props, ref) => {
  const { onChange, value, ...other } = props;

  let strippedPhone = '';

  if (value) {
    strippedPhone = value.split(/[\s+()-]+/).join('');

    if (strippedPhone.length > 11 && strippedPhone.startsWith('55')) {
      strippedPhone = strippedPhone.replace('55', '');
    }
  }

  return (
    <IMaskInput
      {...other}
      mask={[{ mask: '(00) 0000-0000' }, { mask: '(00) 00000-0000' }]}
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => onChange({ target: { name: props.name, value: value as string } })}
      defaultValue={strippedPhone}
    />
  );
};

export default forwardRef(PhoneMask) as ElementType;
