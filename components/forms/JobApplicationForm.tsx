'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { FormField } from './FormField';
import { TurnstileWidget } from './TurnstileWidget';
import { SubmitButton } from './SubmitButton';
import { submitJobApplication } from '@/app/[locale]/kariyer/[slug]/_actions';
import type { FormActionResult } from '@/lib/schemas/forms';
import { cn } from '@/lib/utils';

export function JobApplicationForm({ jobSlug }: { jobSlug: string }) {
  const t = useTranslations('application_form');
  const tc = useTranslations('contact_form');
  const [token, setToken] = React.useState('');
  const [result, setResult] = React.useState<FormActionResult | null>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function action(formData: FormData) {
    formData.set('turnstileToken', token);
    formData.set('job_slug', jobSlug);
    const r = await submitJobApplication(formData);
    setResult(r);
    if (r.ok) formRef.current?.reset();
  }

  if (result?.ok) {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent/10 p-6">
        <h3 className="text-lg font-semibold">{t('success_title')}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{t('success_body')}</p>
      </div>
    );
  }

  const fieldErrs =
    result && !result.ok && result.error === 'validation' ? (result.fieldErrors ?? {}) : {};

  return (
    <form ref={formRef} action={action} className="space-y-6" encType="multipart/form-data">
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={t('name')} name="name" required error={fieldErrs.name?.[0]}>
          <input
            id="name"
            name="name"
            required
            className={inputCls(!!fieldErrs.name)}
            autoComplete="name"
          />
        </FormField>
        <FormField label={t('email')} name="email" required error={fieldErrs.email?.[0]}>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputCls(!!fieldErrs.email)}
            autoComplete="email"
          />
        </FormField>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField label={t('phone')} name="phone" error={fieldErrs.phone?.[0]}>
          <input
            id="phone"
            name="phone"
            className={inputCls(false)}
            autoComplete="tel"
          />
        </FormField>
        <FormField label={t('linkedin')} name="linkedin_url" error={fieldErrs.linkedin_url?.[0]}>
          <input
            id="linkedin_url"
            name="linkedin_url"
            type="url"
            className={inputCls(false)}
            placeholder="https://linkedin.com/in/…"
          />
        </FormField>
      </div>
      <FormField
        label={t('cover_letter')}
        name="cover_letter"
        required
        error={fieldErrs.cover_letter?.[0]}
      >
        <textarea
          id="cover_letter"
          name="cover_letter"
          rows={6}
          required
          className={cn(inputCls(!!fieldErrs.cover_letter), 'resize-y')}
          placeholder={t('cover_letter_placeholder')}
        />
      </FormField>
      <FormField
        label={t('cv_upload')}
        name="cv"
        required
        error={fieldErrs.cv?.[0] ? t(`errors.${fieldErrs.cv[0]}`) : undefined}
      >
        <input
          id="cv"
          name="cv"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          required
          className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-medium file:text-accent-foreground hover:file:bg-accent/80"
        />
      </FormField>
      <input type="hidden" name="turnstileToken" value={token} />
      <TurnstileWidget onVerify={setToken} onExpire={() => setToken('')} />
      {result && !result.ok && result.error !== 'validation' && (
        <p role="alert" className="text-sm text-red-400">
          {result.message ?? tc('errors.server')}
        </p>
      )}
      <SubmitButton label={t('submit')} pendingLabel={t('submitting')} />
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
