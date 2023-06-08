import userEvent from '@testing-library/user-event';
import React from 'react';
import { MoneyMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / money-mask', () => {
  describe('when userEvent types one thousand reais', () => {
    it('should mask money correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<MoneyMask
        onChange={onChange}
        name="test"
             />);
      await user.type(screen.getByRole('textbox'), '1234,00');

      expect(screen.getByRole('textbox')).toHaveValue('R$ 1.234,00');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<MoneyMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '1234,00');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 'R$ 1.234,00' } });
    });
  });

  describe('when userEvent types hundred reais', () => {
    it('should mask money correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<MoneyMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '120,00');

      expect(screen.getByRole('textbox')).toHaveValue('R$ 120,00');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<MoneyMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '120,00');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 'R$ 120,00' } });
    });
  });

  describe('when userEvent types one real', () => {
    it('should mask money correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<MoneyMask
        onChange={onChange}
        name="test"
             />);
      await user.type(screen.getByRole('textbox'), '12,00');

      expect(screen.getByRole('textbox')).toHaveValue('R$ 12,00');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<MoneyMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '12,00');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 'R$ 12,00' } });
    });
  });
});
