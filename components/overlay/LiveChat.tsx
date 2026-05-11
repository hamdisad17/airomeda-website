'use client';
import * as React from 'react';

interface QuickReply {
  text: string;
  action: 'demo' | 'pricing' | 'support' | 'whatsapp';
}

const REPLIES: QuickReply[] = [
  { text: 'Demo görmek istiyorum', action: 'demo' },
  { text: 'Fiyat bilgisi alabilir miyim?', action: 'pricing' },
  { text: 'Teknik destek lazım', action: 'support' },
  { text: "WhatsApp'tan yazsam?", action: 'whatsapp' },
];

export function LiveChat() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: 'Merhaba! Size nasıl yardımcı olabiliriz?' },
  ]);
  const [unread, setUnread] = React.useState(true);

  function handleOpen() {
    setOpen((prev) => {
      if (!prev) setUnread(false);
      return !prev;
    });
  }

  function handleReply(reply: QuickReply) {
    setMessages((m) => [...m, { from: 'user', text: reply.text }]);
    setTimeout(() => {
      const botResponse =
        reply.action === 'demo'
          ? 'Harika! Ekibimiz size en uygun demo zamanını ayarlayacak. Birkaç dakikanızı alarak iletişim formunu doldurabilir misiniz?'
          : reply.action === 'pricing'
            ? 'Her projeyi ayrı değerlendiriyoruz. Müşteri temsilcimiz size 24 saat içinde ulaşacak. WhatsApp veya e-posta hangisini tercih edersiniz?'
            : reply.action === 'support'
              ? 'Mevcut müşterimiz misiniz? destek@airomeda.com adresinden bize ulaşabilir veya WhatsApp\'tan +90 507 637 0052 numarasını arayabilirsiniz.'
              : 'WhatsApp\'tan bize +90 507 637 0052 numarasından ulaşabilirsiniz. Veya hemen tıklayarak konuşmaya başlayalım!';
      setMessages((m) => [...m, { from: 'bot', text: botResponse }]);
    }, 600);
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={handleOpen}
        className="fixed bottom-6 left-6 z-40 group flex items-center gap-3 bg-accent text-accent-foreground px-5 py-3.5 shadow-[0_10px_40px_-10px_hsl(189_100%_50%_/_0.6)] hover:shadow-[0_20px_60px_-10px_hsl(189_100%_50%_/_0.8)] transition-shadow"
        aria-label={open ? 'Canlı desteği kapat' : 'Canlı destek başlat'}
      >
        <span className="relative flex items-center justify-center w-6 h-6">
          {open ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {unread && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success" />
                </span>
              )}
            </>
          )}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider">
          {open ? 'kapat' : 'canlı destek'}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 left-6 z-40 w-[360px] max-w-[calc(100vw-3rem)] border border-border bg-elevated shadow-[0_30px_80px_-20px_hsl(189_100%_50%_/_0.3)] animate-chat-slide">
          <div className="border-b border-border bg-background px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              <span className="font-semibold text-sm text-foreground">Airomeda Destek</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              ortalama yanıt · 2dk
            </span>
          </div>

          <div className="p-4 max-h-[320px] overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm ${
                    m.from === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-background border border-border text-foreground'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-3 space-y-1.5 bg-background">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">
              hızlı seçenekler
            </p>
            {REPLIES.map((r) => (
              <button
                key={r.action}
                type="button"
                onClick={() => handleReply(r)}
                className="w-full text-left px-3 py-2 text-xs border border-border bg-elevated hover:border-accent hover:text-accent transition-colors"
              >
                {r.text}
              </button>
            ))}
            <a
              href="https://wa.me/905076370052"
              target="_blank"
              rel="noreferrer"
              className="block mt-3 px-3 py-2.5 text-center text-xs font-medium bg-success text-foreground hover:opacity-90 transition-opacity"
            >
              WhatsApp ile yazışmaya başla
            </a>
          </div>
        </div>
      )}
    </>
  );
}
