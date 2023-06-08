import userEvent from '@testing-library/user-event';
import React from 'react';
import { PhoneMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / phone-mask', () => {
  describe('when user types a phone with 8 numbers', () => {
    it('should mask phone correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <PhoneMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1236532141');

      expect(screen.getByRole('textbox')).toHaveValue('(12) 3653-2141');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <PhoneMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1236532141');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '(12) 3653-2141' } });
    });
  });

  describe('when user types a phone with 9 numbers', () => {
    it('should mask phone correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <PhoneMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '12992392308');

      expect(screen.getByRole('textbox')).toHaveValue('(12) 99239-2308');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <PhoneMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '12992392308');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '(12) 99239-2308' } });
    });
  });
});
