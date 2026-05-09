'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type Props = {
  label: string;
  pendingLabel: string;
  disabled?: boolean;
};

export function SubmitButton({ label, pendingLabel, disabled }: Props) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={disabled || pending}>
      {pending ? pendingLabel : label}
    </Button>
  );
}
