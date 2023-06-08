import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberInput } from '..';

describe('Components / UI / NumberInput', () => {
  describe('when min is defined', () => {
    describe('when user tries to set it to a value lower than min by click', () => {
      it('should lock to min value', async () => {
        const user = userEvent.setup();

        render(
          <NumberInput
            min={3}
            name="number"
            value={4}
          />,
        );

        await act(async () => {
          await user.click(screen.getAllByRole('button')[0]);
          await user.click(screen.getAllByRole('button')[0]);
        });

        expect(screen.getByRole('textbox')).toHaveValue('3');
      });
    });

    describe('when user tries to set it to a value lower than min by typing', () => {
      it('should lock to min value', async () => {
        const user = userEvent.setup();

        render(
          <NumberInput
            min={3}
            name="number"
            value={4}
          />,
        );

        await act(async () => {
          await user.clear(screen.getByRole('textbox'));
          await user.type(screen.getByRole('textbox'), '2');
          await user.click(document.body);
        });

        expect(screen.getByRole('textbox')).toHaveValue('3');
      });
    });
  });

  describe('when max is defined', () => {
    describe('when user tries to set it to a value lower than max by click', () => {
      it('should lock to max value', async () => {
        const user = userEvent.setup();

        render(
          <NumberInput
            max={3}
            name="number"
            value={2}
          />,
        );

        await act(async () => {
          await user.click(screen.getAllByRole('button')[1]);
          await user.click(screen.getAllByRole('button')[1]);
        });

        expect(screen.getByRole('textbox')).toHaveValue('3');
      });
    });

    describe('when user tries to set it to a value lower than max by typing', () => {
      it('should lock to max value', async () => {
        const user = userEvent.setup();

        render(
          <NumberInput
            max={3}
            name="number"
            value={2}
          />,
        );

        await act(async () => {
          await user.clear(screen.getByRole('textbox'));
          await user.type(screen.getByRole('textbox'), '4');
          await user.click(document.body);
        });

        expect(screen.getByRole('textbox')).toHaveValue('3');
      });
    });
  });

  describe('when onChange is defined', () => {
    it('should call onChange correctly', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();

      render(
        <NumberInput
          value={10}
          onChange={onChange}
          name="count"
        />,
      );

      await act(async () => {
        await user.click(screen.getAllByRole('button')[0]);
      });

      expect(onChange).toHaveBeenCalledWith(9);

      await act(async () => {
        await user.click(screen.getAllByRole('button')[1]);
      });

      expect(onChange).toHaveBeenCalledWith(10);

      await act(async () => {
        await user.clear(screen.getByRole('textbox'));
        await user.type(screen.getByRole('textbox'), '8');
      });

      expect(onChange).toHaveBeenCalledWith(8);
    });
  });
});
