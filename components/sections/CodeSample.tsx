'use client';
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';
import { TextReveal } from '@/components/motion/TextReveal';

export function CodeSample() {
  return (
    <section className="border-b border-border bg-muted py-28 md:py-36">
      <Container as="div">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <RevealSection>
            <div>
              <p className="text-eyebrow uppercase text-muted-foreground">04 — Architecture</p>
              <h2 className="mt-4 text-display-2 font-medium tracking-tight">
                <TextReveal as="span">Üretim için yazılmış kod.</TextReveal>
              </h2>
              <p className="mt-6 text-body-lg text-muted-foreground">
                <span className="font-serif-italic text-foreground">İdempotent, audit-ready, transactional.</span>{' '}
                Production&apos;a aldığımız her satırın geri dönüşü ve denetimi var. Regülatör denetiminden
                geri dönen müşterimiz yok.
              </p>
              <ul className="mt-10 space-y-4 text-sm">
                <li className="flex items-start gap-4 border-t border-border pt-4">
                  <span className="text-accent">01</span>
                  <span>Idempotency keys ile retry güvenliği</span>
                </li>
                <li className="flex items-start gap-4 border-t border-border pt-4">
                  <span className="text-accent">02</span>
                  <span>Distributed transactions ile tutarlılık</span>
                </li>
                <li className="flex items-start gap-4 border-t border-border pt-4">
                  <span className="text-accent">03</span>
                  <span>Audit trail — her olay log&apos;da</span>
                </li>
                <li className="flex items-start gap-4 border-t border-border pt-4">
                  <span className="text-accent">04</span>
                  <span>BDDK / TCMB uyumlu retention</span>
                </li>
              </ul>
            </div>
          </RevealSection>
          <RevealSection delay={0.1}>
            <div className="border border-border bg-elevated">
              <div className="flex items-center border-b border-border px-4 py-3">
                <span className="font-mono text-xs text-muted-foreground">payments/transfer.ts</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed">
                <code>
                  <span className="tok-com">{'// idempotent transfer with audit trail'}</span>
                  {'\n\n'}
                  <span className="tok-key">{'export async function'}</span>
                  {' '}
                  <span className="tok-fn">{'transfer'}</span>
                  {'(input: TransferInput) {\n'}
                  {'  '}
                  <span className="tok-key">{'const'}</span>
                  {' tx = '}
                  <span className="tok-key">{'await'}</span>
                  {' ledger.'}
                  <span className="tok-fn">{'beginTransaction'}</span>
                  {'({ idempotency: input.id });\n'}
                  {'  '}
                  <span className="tok-key">{'try'}</span>
                  {' {\n    '}
                  <span className="tok-key">{'await'}</span>
                  {' ledger.'}
                  <span className="tok-fn">{'debit'}</span>
                  {'(input.from, input.amount);\n    '}
                  <span className="tok-key">{'await'}</span>
                  {' ledger.'}
                  <span className="tok-fn">{'credit'}</span>
                  {'(input.to, input.amount);\n    '}
                  <span className="tok-key">{'await'}</span>
                  {' audit.'}
                  <span className="tok-fn">{'record'}</span>
                  {'('}
                  <span className="tok-str">{"'transfer'"}</span>
                  {', { ...input, status: '}
                  <span className="tok-str">{"'settled'"}</span>
                  {' });\n    '}
                  <span className="tok-key">{'return await'}</span>
                  {' tx.'}
                  <span className="tok-fn">{'commit'}</span>
                  {'();\n  } '}
                  <span className="tok-key">{'catch'}</span>
                  {' (err) {\n    '}
                  <span className="tok-key">{'await'}</span>
                  {' audit.'}
                  <span className="tok-fn">{'record'}</span>
                  {'('}
                  <span className="tok-str">{"'transfer'"}</span>
                  {', { ...input, status: '}
                  <span className="tok-str">{"'failed'"}</span>
                  {' });\n    '}
                  <span className="tok-key">{'throw await'}</span>
                  {' tx.'}
                  <span className="tok-fn">{'rollback'}</span>
                  {'(err);\n  }\n}'}
                </code>
              </pre>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
