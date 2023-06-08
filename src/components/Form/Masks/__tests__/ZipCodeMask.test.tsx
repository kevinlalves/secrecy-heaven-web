import userEvent from '@testing-library/user-event';
import React from 'react';
import { ZipCodeMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / zipCode mask', () => {

  describe('when user types a zipCode', () => {
    it('should mask zipCode correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<ZipCodeMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '12281520');

      expect(screen.getByRole('textbox')).toHaveValue('12281-520');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<ZipCodeMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '12281520');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '12281-520' } });
    });
  });
});
