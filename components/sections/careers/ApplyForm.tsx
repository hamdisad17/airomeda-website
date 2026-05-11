'use client';
import * as React from 'react';
import { Container } from '@/components/layout/Container';
import { MagneticButton } from '@/components/motion/MagneticButton';

interface ApplyFormProps {
  jobSlug: string;
  jobTitle: string;
}

export function ApplyForm({ jobSlug, jobTitle }: ApplyFormProps) {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', cvLink: '', note: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production this would call a server action
    setSubmitted(true);
  }

  const inputCls =
    'w-full bg-background border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono transition-colors focus:border-accent focus:ring-1 focus:ring-accent';

  return (
    <section id="apply" className="border-t border-border bg-elevated/20">
      <Container as="div" className="py-16 md:py-20 max-w-3xl mx-auto">
        <p className="font-mono text-eyebrow uppercase text-accent mb-6">{'// başvuru formu'}</p>
        <h2
          className="font-semibold tracking-tight text-foreground mb-10"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.03em' }}
        >
          {jobTitle} pozisyonuna başvur.
        </h2>

        {submitted ? (
          <div className="border border-accent/40 bg-accent/10 p-6">
            <h3 className="font-mono text-sm text-accent">✓ başvurunuz alındı</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              İnceledikten sonra 5 iş günü içinde geri döneceğiz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Adınız Soyadınız"
                  className={inputCls}
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="siz@example.com"
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                CV / LinkedIn / GitHub linki *
              </label>
              <input
                type="url"
                name="cvLink"
                value={form.cvLink}
                onChange={handleChange}
                required
                placeholder="https://..."
                className={inputCls}
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
                Kısa not (neden bu rol?)
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={5}
                placeholder="Kendinizden ve bu pozisyona başvurma nedeninizden kısaca bahsedin..."
                className={`${inputCls} resize-y`}
              />
            </div>
            <input type="hidden" name="jobSlug" value={jobSlug} />
            <div className="pt-2">
              <MagneticButton>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-all hover:shadow-[0_0_40px_-5px_hsl(189_100%_50%_/_0.6)]"
                >
                  Başvuruyu gönder →
                </button>
              </MagneticButton>
            </div>
          </form>
        )}
      </Container>
    </section>
  );
}
