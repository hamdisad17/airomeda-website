'use client';
import * as React from 'react';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = React.useCallback(() => {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      aria-label="Copy code"
    >
      {copied ? (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          copied
        </>
      ) : (
        <>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          copy
        </>
      )}
    </button>
  );
}

function tokensToPlainText(code: { tok?: string; t: string }[]): string {
  return code.map((s) => s.t).join('');
}
import { Container } from '@/components/layout/Container';
import { RevealSection } from '@/components/motion/RevealSection';

type Token = { tok?: 'com' | 'key' | 'fn' | 'str' | 'num'; t: string };

const TABS: { id: string; label: string; file: string; code: Token[] }[] = [
  {
    id: 'finance',
    label: 'Finance',
    file: 'payments/transfer.ts',
    code: [
      { tok: 'com', t: '// idempotent transfer with audit trail' },
      { t: '\n\n' },
      { tok: 'key', t: 'export async function' },
      { t: ' ' },
      { tok: 'fn', t: 'transfer' },
      { t: '(input: TransferInput) {\n  ' },
      { tok: 'key', t: 'const' },
      { t: ' tx = ' },
      { tok: 'key', t: 'await' },
      { t: ' ledger.' },
      { tok: 'fn', t: 'beginTransaction' },
      { t: '({ idempotency: input.id });\n  ' },
      { tok: 'key', t: 'try' },
      { t: ' {\n    ' },
      { tok: 'key', t: 'await' },
      { t: ' ledger.' },
      { tok: 'fn', t: 'debit' },
      { t: '(input.from, input.amount);\n    ' },
      { tok: 'key', t: 'await' },
      { t: ' ledger.' },
      { tok: 'fn', t: 'credit' },
      { t: '(input.to, input.amount);\n    ' },
      { tok: 'key', t: 'await' },
      { t: ' audit.' },
      { tok: 'fn', t: 'record' },
      { t: '(' },
      { tok: 'str', t: "'transfer'" },
      { t: ', { ...input, status: ' },
      { tok: 'str', t: "'settled'" },
      { t: ' });\n    ' },
      { tok: 'key', t: 'return await' },
      { t: ' tx.' },
      { tok: 'fn', t: 'commit' },
      { t: '();\n  } ' },
      { tok: 'key', t: 'catch' },
      { t: ' (err) {\n    ' },
      { tok: 'key', t: 'throw await' },
      { t: ' tx.' },
      { tok: 'fn', t: 'rollback' },
      { t: '(err);\n  }\n}' },
    ],
  },
  {
    id: 'gaming',
    label: 'iGaming',
    file: 'gaming/spin.ts',
    code: [
      { tok: 'com', t: '// certified RNG with auditable seed' },
      { t: '\n\n' },
      { tok: 'key', t: 'export async function' },
      { t: ' ' },
      { tok: 'fn', t: 'placeSpin' },
      { t: '(input: SpinRequest) {\n  ' },
      { tok: 'key', t: 'const' },
      { t: ' seed = ' },
      { tok: 'key', t: 'await' },
      { t: ' rng.' },
      { tok: 'fn', t: 'nextSeed' },
      { t: '({ provider: input.gameId });\n  ' },
      { tok: 'key', t: 'await' },
      { t: ' wallet.' },
      { tok: 'fn', t: 'reserve' },
      { t: '(input.userId, input.bet);\n  ' },
      { tok: 'key', t: 'const' },
      { t: ' outcome = ' },
      { tok: 'fn', t: 'computeOutcome' },
      { t: '(seed, input);\n  ' },
      { tok: 'key', t: 'if' },
      { t: ' (outcome.payout > ' },
      { tok: 'num', t: '0' },
      { t: ') ' },
      { tok: 'key', t: 'await' },
      { t: ' wallet.' },
      { tok: 'fn', t: 'credit' },
      { t: '(input.userId, outcome.payout);\n  ' },
      { tok: 'key', t: 'await' },
      { t: ' regulator.' },
      { tok: 'fn', t: 'logSpin' },
      { t: '({ seed, outcome, ...input });\n  ' },
      { tok: 'key', t: 'return' },
      { t: ' outcome;\n}' },
    ],
  },
  {
    id: 'commerce',
    label: 'E-Commerce',
    file: 'commerce/checkout.ts',
    code: [
      { tok: 'com', t: '// transactional checkout, multi-tenant marketplace' },
      { t: '\n\n' },
      { tok: 'key', t: 'export async function' },
      { t: ' ' },
      { tok: 'fn', t: 'checkout' },
      { t: '(cart: Cart, payment: PaymentMethod) {\n  ' },
      { tok: 'key', t: 'const' },
      { t: ' tx = ' },
      { tok: 'key', t: 'await' },
      { t: ' db.' },
      { tok: 'fn', t: 'transaction' },
      { t: '();\n  ' },
      { tok: 'key', t: 'for' },
      { t: ' (' },
      { tok: 'key', t: 'const' },
      { t: ' line ' },
      { tok: 'key', t: 'of' },
      { t: ' cart.lines) {\n    ' },
      { tok: 'key', t: 'await' },
      { t: ' inventory.' },
      { tok: 'fn', t: 'reserve' },
      { t: '(line.sku, line.qty);\n  }\n  ' },
      { tok: 'key', t: 'const' },
      { t: ' charge = ' },
      { tok: 'key', t: 'await' },
      { t: ' psp.' },
      { tok: 'fn', t: 'authorize' },
      { t: '(payment, cart.total);\n  ' },
      { tok: 'key', t: 'if' },
      { t: ' (!charge.ok) ' },
      { tok: 'key', t: 'throw' },
      { t: ' tx.' },
      { tok: 'fn', t: 'rollback' },
      { t: '();\n  ' },
      { tok: 'key', t: 'return await' },
      { t: ' tx.' },
      { tok: 'fn', t: 'commit' },
      { t: '();\n}' },
    ],
  },
];

export function CodeSample() {
  const [active, setActive] = React.useState(TABS[0]!.id);
  const current = TABS.find((t) => t.id === active) ?? TABS[0]!;

  return (
    <section className="border-b border-border bg-muted/30 py-24 md:py-32">
      <Container as="div">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <RevealSection>
            <div>
              <p className="font-mono text-eyebrow uppercase text-accent">
                {'// 03 · architecture'}
              </p>
              <h2 className="mt-4 text-display-2 font-semibold tracking-tight">
                Her iş alanına özel çözümler.
              </h2>
              <p className="mt-6 text-body-lg text-muted-foreground">
                Finans&apos;tan e-ticarete, oyun sektöründen sağlığa — her sektörün kendine özgü ihtiyaçlarını bilen 36 kişilik uzman ekibimizle çözüm üretiyoruz.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Güvenli ödeme ve bankacılık yazılımı
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Denetim ve regülasyona tam uyum
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Her işlem kayıt altında, tam şeffaflık
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">→</span>
                  Ziraat Bankası düzeyinde güvenilirlik
                </li>
              </ul>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="border border-border bg-elevated">
              {/* Tabs + copy */}
              <div className="flex items-center border-b border-border bg-muted/40">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`relative px-4 py-3 font-mono text-xs transition-colors ${
                      active === t.id
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.label}
                    {active === t.id && (
                      <span className="absolute inset-x-2 bottom-0 h-px bg-accent" />
                    )}
                  </button>
                ))}
                <span className="ml-auto font-mono text-xs text-muted-foreground hidden sm:inline">
                  {current.file}
                </span>
                <span className="px-4">
                  <CopyButton code={tokensToPlainText(current.code)} />
                </span>
              </div>
              {/* Code body with line numbers */}
              <div className="flex overflow-x-auto">
                <div
                  aria-hidden
                  className="select-none border-r border-border bg-muted/30 px-3 py-5 font-mono text-xs text-muted-foreground/50 leading-relaxed flex-shrink-0"
                >
                  {Array.from({ length: 16 }, (_, i) => (
                    <div key={i} className="leading-relaxed">{i + 1}</div>
                  ))}
                </div>
                <pre className="flex-1 overflow-x-auto p-5 font-mono text-xs leading-relaxed">
                  <code>
                    {current.code.map((seg, i) =>
                      seg.tok ? (
                        <span key={i} className={`tok-${seg.tok}`}>
                          {seg.t}
                        </span>
                      ) : (
                        seg.t
                      ),
                    )}
                  </code>
                </pre>
              </div>
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
