import * as React from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/utils/tailwind';

const buttonVariants = cva(
  'relative rounded-lg inline-flex font-sans font-medium not-italic no-underline inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        solid: 'bg-accent-main hover:bg-accent-most text-foreground-inverted',
        outline: 'bg-background-main hover:bg-background-least text-foreground-main border border-background-max',
        ghost: 'hover:bg-background-alpha underline text-foreground-subtle',
        destructive: 'bg-negative-main hover:bg-negative-most text-white',
      },
      size: {
        sm: 'text-sm leading-5 h-8 gap-2 px-3',
        md: 'text-base leading-6 h-10 gap-2 px-4',
        lg: 'text-xl leading-7 h-12 gap-3 px-5',
      },
      isLoading: {
        true: 'opacity-50 text-transparent',
        false: '',
      },
      iconOnly: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Sizing for loading buttons
      {
        size: 'sm',
        isLoading: true,
        iconOnly: true,
        className: 'w-8 px-2',
      },
      {
        size: 'md',
        isLoading: true,
        iconOnly: true,
        className: 'h-11 w-11 px-2.5',
      },
      {
        size: 'lg',
        isLoading: true,
        iconOnly: true,
        className: 'w-12 px-3',
      },

      // Sizing for icon only buttons
      {
        size: 'sm',
        iconOnly: true,
        className: 'w-8',
      },
      {
        size: 'md',
        iconOnly: true,
        className: 'w-11',
      },
      {
        size: 'lg',
        iconOnly: true,
        className: 'w-12',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      isLoading: false,
    },
  },
);

const buttonIconVariants = cva('', {
  variants: {
    variant: {
      solid: 'text-white',
      outline: 'text-foreground-main',
      ghost: 'text-foreground-subtle',
      destructive: 'text-white',
    },
    iconSize: {
      xs: 'w-4 h-4',
      sm: '',
      md: '',
      lg: 'w-6 h-6',
    },
    isLoading: {
      true: 'absolute animate-spin',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: FontAwesomeIconProps['icon'];
  as?: React.ElementType;
  href?: string;
  target?: HTMLAnchorElement['target'];
}

export interface ButtonIconProps extends FontAwesomeIconProps, VariantProps<typeof buttonIconVariants> {
  isLoading?: boolean;
  iconSize: ButtonProps['size'] | 'xs';
}

const ButtonIcon = React.forwardRef<SVGSVGElement, ButtonIconProps>(
  ({ className, variant, isLoading, icon, spin, iconSize, ...props }, ref) => {
    return (
      <FontAwesomeIcon
        className={cn(buttonIconVariants({ variant, className, isLoading, iconSize }))}
        icon={isLoading ? faSpinner : icon}
        ref={ref}
        {...props}
      />
    );
  },
);

ButtonIcon.displayName = 'ButtonIcon';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, icon, children, as, ...props }, ref) => {
    const Component = as || 'button';
    return (
      <Component
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
            isLoading,
            iconOnly: (icon || isLoading) && !children,
          }),
          className,
        )}
        ref={ref}
        {...props}
      >
        {(isLoading || icon) && (
          <ButtonIcon
            variant={variant}
            iconSize={size}
            icon={isLoading ? faSpinner : icon}
            isLoading={Boolean(isLoading)}
          />
        )}
        {children}
      </Component>
    );
  },
);

Button.displayName = 'Button';

export { Button, ButtonIcon, buttonVariants };
