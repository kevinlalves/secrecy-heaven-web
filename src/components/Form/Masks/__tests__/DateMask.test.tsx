import userEvent from '@testing-library/user-event';
import React from 'react';
import { DateMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / date-mask', () => {
  describe('when user types a date', () => {
    it('should mask date correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<DateMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '26061996');

      expect(screen.getByRole('textbox')).toHaveValue('26/06/1996');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<DateMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '26061996');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '26/06/1996' } });
    });
  });
});
