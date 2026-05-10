import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/ui/Reveal';

export function CodeSample() {
  return (
    <section className="border-b border-border bg-muted/30 py-24 md:py-32">
      <Container as="div">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div>
              <p className="font-mono text-eyebrow uppercase text-accent">{'// 02 · architecture'}</p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Denetlenebilir kod, üretim hızında.
              </h2>
              <p className="mt-6 text-body-lg text-muted-foreground">
                Idempotent transactional flows, event-sourced audit log, regulator-ready evidence.
                Production&apos;a aldığımız her satırın geri dönüşü ve denetimi var.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent shrink-0">→</span>
                  <span>Idempotency keys for retry safety</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent shrink-0">→</span>
                  <span>Distributed transactions for consistency</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent shrink-0">→</span>
                  <span>Full audit trail — success + failure logged</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent shrink-0">→</span>
                  <span>BDDK / TCMB compliant data retention</span>
                </li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-border bg-elevated overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">payments/transfer.ts</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed">
                <code>
                  <span className="tok-com">{'// payments/transfer.ts'}</span>{'\n'}
                  <span className="tok-key">import</span>{' { ledger } '}
                  <span className="tok-key">from</span>{' '}
                  <span className="tok-str">{`'@airomeda/core'`}</span>{';'}{'\n'}
                  <span className="tok-key">import</span>{' { audit } '}
                  <span className="tok-key">from</span>{' '}
                  <span className="tok-str">{`'@airomeda/audit'`}</span>{';'}{'\n\n'}
                  <span className="tok-key">export async function</span>{' '}
                  <span className="tok-fn">transfer</span>{'(input: TransferInput) {'}{'\n'}
                  {'  '}
                  <span className="tok-key">const</span>{' tx = '}
                  <span className="tok-key">await</span>{' ledger.'}
                  <span className="tok-fn">beginTransaction</span>{'({ idempotency: input.id });'}{'\n'}
                  {'  '}
                  <span className="tok-key">try</span>{' {'}{'\n'}
                  {'    '}
                  <span className="tok-key">await</span>{' ledger.'}
                  <span className="tok-fn">debit</span>{'(input.from, input.amount);'}{'\n'}
                  {'    '}
                  <span className="tok-key">await</span>{' ledger.'}
                  <span className="tok-fn">credit</span>{'(input.to, input.amount);'}{'\n'}
                  {'    '}
                  <span className="tok-key">await</span>{' audit.'}
                  <span className="tok-fn">record</span>{'('}
                  <span className="tok-str">{`'transfer'`}</span>
                  {', { ...input, status: '}
                  <span className="tok-str">{`'settled'`}</span>
                  {' });'}{'\n'}
                  {'    '}
                  <span className="tok-key">return await</span>{' tx.'}
                  <span className="tok-fn">commit</span>{'();'}{'\n'}
                  {'  } '}
                  <span className="tok-key">catch</span>{' (err) {'}{'\n'}
                  {'    '}
                  <span className="tok-key">await</span>{' audit.'}
                  <span className="tok-fn">record</span>{'('}
                  <span className="tok-str">{`'transfer'`}</span>
                  {', { ...input, status: '}
                  <span className="tok-str">{`'failed'`}</span>
                  {' });'}{'\n'}
                  {'    '}
                  <span className="tok-key">throw await</span>{' tx.'}
                  <span className="tok-fn">rollback</span>{'(err);'}{'\n'}
                  {'  }'}{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
