import { render, screen } from '@testing-library/react';
import { Input } from 'src/components/ui/Input';

describe('Components / ui / Input', () => {
  describe('when endAdornment is setted', () => {
    it('it renders endAdornment correctly', () => {
      render(<Input endAdornment />);

      expect(screen.getByTestId('input-end-adornment')).toBeInTheDocument();
    });
  });

  describe('when endAdornment is not setted', () => {
    it('it does not render endAdornment', () => {
      render(<Input />);

      expect(screen.queryByTestId('input-end-adornment')).not.toBeInTheDocument();
    });
  });
});
