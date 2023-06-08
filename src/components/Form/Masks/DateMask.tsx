import { ElementType, ForwardRefRenderFunction, RefCallback, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

type CustomProps = {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  maxDate?: Date;
  minDate?: Date;
  value: string;
};

const DateMask: ForwardRefRenderFunction<HTMLElement, CustomProps> = (props, ref) => {
  const { onChange, value, ...other } = props;

  const format = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return [day, month, year].join('/');
  };

  const parse = (str: string) => {
    const parsedData = str.split('/');

    return new Date(Number(parsedData[2]), Number(parsedData[1]) - 1, Number(parsedData[0]));
  };

  return (
    <IMaskInput
      {...other}
      mask={Date}
      pattern="d{/}`m{/}`Y"
      parse={parse}
      format={format}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => onChange({ target: { name: props.name, value: value as string } })}
      defaultValue={value}
    />
  );
};

export default forwardRef(DateMask) as ElementType;
