import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/tailwind';

const inputVariants = cva(
  'px-3 flex w-full rounded-md border border-background-max bg-background-main text-foreground-main ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-alpha focus-visible:outline-none focus-visible:ring-2 focus-visible:border-accent-main focus-visible:ring-accent-alpha focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-foreground-least',
  {
    variants: {
      size: {
        sm: 'h-8 text-sm',
        md: 'py-2 text-md',
        lg: 'py-2.5 text-lg',
      },
      isInvalid: {
        true: 'border-negative-main focus-visible:border-negative-main focus-visible:ring-red-200',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  isRequired?: boolean;
  as?: React.ElementType;
  endAdornment?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, isInvalid, isRequired, as, endAdornment, ...props }, ref) => {
    const Component = as || 'input';

    return (
      <div className="relative">
        <Component
          className={cn(inputVariants({ className, size, isInvalid }))}
          aria-invalid={isInvalid}
          aria-required={isRequired}
          ref={ref}
          {...props}
        />
        {endAdornment && (
          <div data-testid="input-end-adornment" className="absolute right-3 top-[50%] -translate-y-1/2">
            {endAdornment}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
