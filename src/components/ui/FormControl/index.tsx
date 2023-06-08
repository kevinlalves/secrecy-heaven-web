import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/tailwind';

const formControlVariants = cva('grid grid-cols-3 gap-1 bg-background-main', {
  variants: {
    size: {
      sm: 'min-h-[52px]',
      md: 'min-h-[60px]',
      lg: 'min-h-[68px]',
    },
    isDisabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formControlVariants> {
  name: string;
  label: string;
  detail?: string;
  caption?: string;
  isInvalid?: boolean;
}

const FormControl = (props: FormControlProps) => {
  const { name, label, detail, caption, isInvalid, isDisabled, size, className, children } = props;

  return (
    <div
      className={cn(className, formControlVariants({ className, size, isDisabled }), {
        'js-form-control-invalid-error': isInvalid,
      })}
    >
      <label
        className={cn(
          'font-sans text-sm font-medium leading-4 text-foreground-main',
          { 'text-negative-most': isInvalid },
          { 'col-span-2': Boolean(detail) },
          { 'col-span-3': !detail },
        )}
        htmlFor={name}
      >
        {label}
      </label>

      {Boolean(detail) && (
        <span
          className={cn('col-span-1 text-right font-sans text-xs leading-4 text-foreground-subtle', {
            'text-negative-least': isInvalid,
          })}
        >
          {detail}
        </span>
      )}

      <div className="col-span-3 max-w-full">{children}</div>

      {Boolean(caption) && (
        <span
          className={cn('col-span-3 font-sans text-xs leading-4 text-foreground-subtle', {
            'text-negative-most': isInvalid,
          })}
        >
          {caption}
        </span>
      )}
    </div>
  );
};

FormControl.displayName = 'FormControl';

export { FormControl };
