import userEvent from '@testing-library/user-event';
import React from 'react';
import { NumberMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / number', () => {
  describe('when userEvent types integer number', () => {
    it('should mask number correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <NumberMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1');

      expect(screen.getByRole('textbox')).toHaveValue('1');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 1 } });
    });
  });

  describe('when userEvent types number with thousand separator', () => {
    it('should mask number correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <NumberMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1200.90');

      expect(screen.getByRole('textbox')).toHaveValue('1200.90');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 1200.90 } });
    });
  });

  describe('when userEvent types float number', () => {
    it('should mask number correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <NumberMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1.39');

      expect(screen.getByRole('textbox')).toHaveValue('1.39');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 1.39 } });
    });
  });

  describe('when precision is setted' , () => {
    it('should mask number correctly according to precision number', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <NumberMask
          onChange={onChange}
          name="test"
          precision={4}
        />
      );

      await user.type(screen.getByRole('textbox'), '1.3935');

      expect(screen.getByRole('textbox')).toHaveValue('1.3935');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 1.3935 } });
    });
  });

  describe('when precision is not setted' , () => {
    it('should mask number correctly with default precision', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <NumberMask
          onChange={onChange}
          name="test"
        />
      );

      await user.type(screen.getByRole('textbox'), '1.3925');

      expect(screen.getByRole('textbox')).toHaveValue('1.39');
      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: 1.39 } });
    });
  });
});
