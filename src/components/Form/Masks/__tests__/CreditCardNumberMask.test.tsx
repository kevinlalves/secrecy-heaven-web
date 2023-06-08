import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreditCardNumberMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / credit card number mask', () => {
  describe('when user types a correct number', () => {
    it('should mask number correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardNumberMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '5226987070546820');
      expect(screen.getByRole('textbox')).toHaveValue('5226 9870 7054 6820');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardNumberMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '5226987070546820');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '5226 9870 7054 6820' } });
    });
  });
});
