'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
};

export function FormField({ label, name, error, required, children, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={name} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
