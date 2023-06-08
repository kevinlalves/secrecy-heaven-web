import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreditCardExpirationDateMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / credit card expiration date mask', () => {
  describe('when user types a correct date', () => {
    it('should mask expiration date correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardExpirationDateMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '042027');
      expect(screen.getByRole('textbox')).toHaveValue('04/2027');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardExpirationDateMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '042027');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '04/2027' } });
    });
  });
});
