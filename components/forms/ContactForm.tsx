'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ContactFormSchema,
  type ContactFormInput,
  type FormActionResult,
} from '@/lib/schemas/forms';
import { FormField } from './FormField';
import { TurnstileWidget } from './TurnstileWidget';
import { SubmitButton } from './SubmitButton';
import { submitContact } from '@/app/[locale]/iletisim/_actions';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const t = useTranslations('contact_form');
  const [serverResult, setServerResult] = React.useState<FormActionResult | null>(null);
  const [token, setToken] = React.useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: '', email: '', company: '', message: '', turnstileToken: '' },
  });

  const onSubmit = async (data: ContactFormInput) => {
    setServerResult(null);
    const r = await submitContact({ ...data, turnstileToken: token || data.turnstileToken });
    setServerResult(r);
    if (r.ok) reset();
  };

  if (serverResult?.ok) {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent/10 p-6">
        <h3 className="text-lg font-semibold">{t('success_title')}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t('success_body')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={t('name')} name="name" required error={errors.name?.message}>
          <input
            id="name"
            {...register('name')}
            className={inputCls(!!errors.name)}
            autoComplete="name"
          />
        </FormField>
        <FormField label={t('email')} name="email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={inputCls(!!errors.email)}
            autoComplete="email"
          />
        </FormField>
      </div>
      <FormField label={t('company')} name="company" error={errors.company?.message}>
        <input
          id="company"
          {...register('company')}
          className={inputCls(false)}
          autoComplete="organization"
        />
      </FormField>
      <FormField label={t('message')} name="message" required error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          {...register('message')}
          className={cn(inputCls(!!errors.message), 'resize-y')}
          placeholder={t('message_placeholder')}
        />
      </FormField>
      <input type="hidden" {...register('turnstileToken')} value={token} />
      <TurnstileWidget onVerify={setToken} onExpire={() => setToken('')} />
      {serverResult && !serverResult.ok && (
        <p role="alert" className="text-sm text-red-400">
          {serverResult.message ??
            t(`errors.${serverResult.error === 'rate_limit' ? 'rate_limit' : 'server'}`)}
        </p>
      )}
      <SubmitButton label={t('submit')} pendingLabel={t('submitting')} disabled={isSubmitting} />
    </form>
  );
}

function inputCls(error: boolean) {
  return cn(
    'w-full rounded-md border bg-muted/30 px-3 py-2 text-sm text-foreground outline-none transition-colors',
    'focus:border-accent focus:ring-1 focus:ring-accent',
    error ? 'border-red-400' : 'border-border',
  );
}
