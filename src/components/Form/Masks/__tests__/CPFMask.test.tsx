import userEvent from '@testing-library/user-event';
import React from 'react';
import { CPFMask } from 'src/components/Form/Masks';
import { render, screen } from '@testing-library/react';

describe('Utils / masks / cpf-mask', () => {

  describe('when user types a cpf', () => {
    it('should mask cpf correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<CPFMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '43816751857');

      expect(screen.getByRole('textbox')).toHaveValue('438.167.518-57');
    });

    it('calls onChange function with correct params', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(<CPFMask
        onChange={onChange}
        name="test"
             />);

      await user.type(screen.getByRole('textbox'), '43816751857');

      expect(onChange).toHaveBeenCalledWith({ target: { name: 'test', value: '438.167.518-57' } });
    });
  });
});
