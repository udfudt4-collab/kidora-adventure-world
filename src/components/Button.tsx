import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'success' | 'ghost' | 'sunny';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-sky-400 hover:bg-sky-500 text-white shadow-pop',
  secondary: 'bg-grape-400 hover:bg-grape-500 text-white shadow-pop',
  success: 'bg-mint-400 hover:bg-mint-500 text-white shadow-pop',
  sunny: 'bg-sun-400 hover:bg-sun-500 text-white shadow-pop',
  ghost: 'bg-white/80 hover:bg-white text-slate-600 shadow-soft',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-5 py-2.5 text-base rounded-2xl',
  lg: 'px-7 py-3.5 text-lg rounded-2xl',
  xl: 'px-8 py-4 text-xl rounded-3xl',
};

export function Button({ variant = 'primary', size = 'md', children, fullWidth, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`btn-press font-display font-bold ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
