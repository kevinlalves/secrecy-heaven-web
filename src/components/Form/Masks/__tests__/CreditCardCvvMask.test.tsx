import userEvent from '@testing-library/user-event';
import React from 'react';
import { CreditCardCvvMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / credit card cvv mask', () => {
  describe('when user types a cvv with 3 numbers', () => {
    it('should mask cvv correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardCvvMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '120');
      expect(screen.getByRole('textbox')).toHaveValue('120');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardCvvMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '120');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '120' } });
    });
  });

  describe('when user types a cvv with 4 numbers', () => {
    it('should mask cvv correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardCvvMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1200');
      expect(screen.getByRole('textbox')).toHaveValue('1200');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <CreditCardCvvMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1200');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '1200' } });
    });
  });
});
