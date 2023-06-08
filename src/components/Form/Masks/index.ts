import ZipCodeMask from './ZipCodeMask';
import DateMask from './DateMask';
import PhoneMask from './PhoneMask';
import CPFMask from './CPFMask';
import MoneyMask from './MoneyMask';
import CreditCardNumberMask from './CreditCardNumberMask';
import CreditCardExpirationDateMask from './CreditCardExpirationDateMask';
import CreditCardCvvMask from './CreditCardCvvMask';
import NumberMask from './NumberMask';

export { DateMask };
export { PhoneMask };
export { CPFMask };
export { ZipCodeMask };
export { MoneyMask };
export { CreditCardNumberMask };
export { CreditCardExpirationDateMask };
export { CreditCardCvvMask };
export { NumberMask };

export type MaskProps = {
  mask?:
    | 'date'
    | 'phone'
    | 'cpf'
    | 'zipCode'
    | 'money'
    | 'creditCardNumber'
    | 'creditCardExpirationDate'
    | 'creditCardCvv'
    | 'number';
};

export const Masks = {
  cpf: CPFMask,
  date: DateMask,
  phone: PhoneMask,
  zipCode: ZipCodeMask,
  money: MoneyMask,
  creditCardNumber: CreditCardNumberMask,
  creditCardExpirationDate: CreditCardExpirationDateMask,
  creditCardCvv: CreditCardCvvMask,
  number: NumberMask,
};
