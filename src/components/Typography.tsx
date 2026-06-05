import React from 'react';

export const H1 = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h1 className={`font-display text-[56px] md:text-[72px] font-semibold tracking-[-0.03em] leading-[1.1] ${className}`}>{children}</h1>
);

export const H2 = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`font-display text-[40px] md:text-[48px] font-medium tracking-[-0.02em] leading-[1.2] ${className}`}>{children}</h2>
);

export const H3 = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h3 className={`font-display text-[22px] font-medium leading-[1.3] ${className}`}>{children}</h3>
);

export const BodyText = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <p className={`font-body text-[16px] font-light leading-[1.75] text-arch-body ${className}`}>{children}</p>
);

export const Label = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <span className={`font-body text-[11px] uppercase tracking-[0.1em] text-arch-label ${className}`}>{children}</span>
);

export const Button = ({ children, primary, className = '', ...props }: any) => {
  return (
    <button
      className={`px-6 py-3 text-[14px] font-medium transition-colors duration-200 rounded-[6px] border ${
        primary
          ? 'bg-arch-primary text-arch-bg border-arch-primary hover:bg-arch-accent hover:border-arch-accent hover:text-white'
          : 'bg-transparent text-arch-primary border-arch-border hover:border-arch-accent hover:text-arch-accent'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-arch-surface border border-arch-border rounded-[12px] p-8 transition-colors duration-300 hover:border-arch-border-hover ${className}`}>
    {children}
  </div>
);
