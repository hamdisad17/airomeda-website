import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

const SAMPLE = `// airomeda/payments/transfer.ts
import { ledger } from '@airomeda/core';
import { audit } from '@airomeda/audit';

export async function transfer(input: TransferInput) {
  const tx = await ledger.beginTransaction({ idempotency: input.id });
  try {
    await ledger.debit(input.from, input.amount);
    await ledger.credit(input.to, input.amount);
    await audit.record('transfer', { ...input, status: 'settled' });
    return await tx.commit();
  } catch (err) {
    await audit.record('transfer', { ...input, status: 'failed', err });
    throw await tx.rollback(err);
  }
}`;

export function CodeSample() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30 py-24 md:py-32">
      <Container as="div">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">Mimari</p>
              <h2 className="mt-3 text-display-2 font-semibold tracking-tight">
                Denetlenebilir mimari, kestirme yapmadan.
              </h2>
              <p className="mt-6 text-body-lg text-muted-foreground">
                Üretim ortamında çalışan kodumuz idempotent, audit-trail&apos;li, transactional. Her adımı geri
                alınabilir, her olay loglanmış. Regülatör denetiminde &ldquo;açıklayamayacağımız bir karar&rdquo;
                bırakmıyoruz.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <li className="flex gap-3"><span className="text-accent">✓</span><span>Idempotency-key ile yeniden deneme güvenliği</span></li>
                <li className="flex gap-3"><span className="text-accent">✓</span><span>Distributed transaction ile tutarlılık</span></li>
                <li className="flex gap-3"><span className="text-accent">✓</span><span>Audit log — başarılı + başarısız her olay kayıt altında</span></li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-xl border border-border bg-[#0d0d12] shadow-elevated overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60"></span>
                <span className="ml-3 font-mono text-xs text-white/50">payments/transfer.ts</span>
              </div>
              <pre className="p-5 text-xs leading-relaxed font-mono text-white/90 overflow-x-auto"><code>{SAMPLE}</code></pre>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
