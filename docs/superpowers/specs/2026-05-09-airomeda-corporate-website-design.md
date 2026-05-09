# Airomeda Kurumsal Website — Tasarım Dokümanı

**Tarih:** 2026-05-09
**Sahip:** Taha (Airomeda)
**Durum:** Brainstorming çıktısı — implementation planlamasına hazır

## 1. Amaç

Airomeda için tek dilli olmayan, yüksek kaliteli bir kurumsal vitrin inşa etmek. Site üç hedefi dengeli karşılamalı:

- **Lead toplama** — B2B müşteri, demo talebi, fiyat teklifi
- **Kurumsal prestij** — şirket ciddiyetini ve kapsam genişliğini iletmek
- **Bilgilendirme** — 7 hizmet için derinlemesine içerik, blog ve vaka çalışmalarıyla SEO

Tek bir hedefe değil, üçünün dengeli karmasına çalışılır.

## 2. Hedef kitle

- B2B kurumsal müşteriler (KOBİ–Kurumsal): finans, e-ticaret, perakende sektörü karar vericileri (CTO, IT Müdürü, Pazarlama Direktörü)
- Şans oyunları / iGaming sektöründen lisanslı operatörler (teknik altyapı + entegrasyon arayanlar)
- Yurt dışı müşteriler — İngilizce içerik gerekli
- İş ortakları, bayiler ve iş başvurusu yapanlar (ikincil ama önemli kanal)

## 3. Kapsam ve sayfa haritası

Tüm sayfalar TR ve EN olarak iki dilde yayınlanır.

```
/                                Anasayfa
/hizmetler                       7 hizmetin özet kartları
/hizmetler/finans                Finans yazılımları detay
/hizmetler/sans-oyunlari         Şans oyunları / iGaming detay
/hizmetler/e-ticaret             E-Ticaret yazılımları detay
/hizmetler/entegrasyon           Entegrasyon yazılımları detay
/hizmetler/seo-reklam            SEO ve reklam çalışmaları
/hizmetler/sosyal-medya          Sosyal medya yönetimi
/hizmetler/crm                   CRM yazılımları detay
/calismalarimiz                  Vaka çalışmaları liste
/calismalarimiz/[slug]           Tekil vaka çalışması
/blog                            Blog liste (kategori filtresi)
/blog/kategori/[slug]            Kategori sayfası
/blog/[slug]                     Tekil blog yazısı
/kariyer                         Açık pozisyonlar + kültür
/kariyer/[slug]                  Tekil iş ilanı + başvuru formu
/hakkimizda                      Şirket hikayesi, misyon, ekip
/iletisim                        Form + ofis bilgisi + harita
/kvkk, /cerez-politikasi         Yasal sayfalar
```

İngilizce yol önekleri lokalize edilir (`/en/services/finance`, `/en/work/[slug]` vb.) ve `hreflang` ile eşlenir.

**Üst navigasyon:** Hizmetler (mega-menu, 7 hizmet listelenir) · Çalışmalarımız · Blog · Hakkımızda · Kariyer · İletişim · Dil seçici (TR/EN)
**Footer:** Hizmet linkleri, şirket linkleri, sosyal medya, KVKK / Çerez, mini iletişim formu.

## 4. Anasayfa bölüm sistemi

```
1. Hero — başlık + alt başlık + 2 CTA ("Demo Talep Et" / "Çalışmalarımız")
   + müşteri logoları şeridi (sosyal kanıt)
2. Hizmetler grid (7 kart)
3. Sektörler şeridi (çalışılan dikey alanlar)
4. Öne çıkan vaka çalışması (1 büyük öne çıkan + sonuç metriği)
5. Süreç — 4 adım: Keşif → Tasarım → Geliştirme → Destek
6. Müşteri sözleri (testimonials, 2-3 referans)
7. Son blog yazıları (3 kart)
8. Final CTA — "Projenizi konuşalım" + kısa iletişim formu
9. Footer
```

Hero'da sabit başlık tercih edilir (rotating headline yerine) — daha güvenli, daha hızlı sürüm.

## 5. Sayfa şablonları

### 5.1 Hizmet detay şablonu (her 7 hizmet aynı yapıyı kullanır)

```
1. Hero — hizmet adı + tek cümlelik değer önerisi + birincil CTA
2. Sorun / çözüm — bizim yaklaşımımız
3. Alt-yetkinlikler grid — 4–8 alt başlık
4. Teknoloji yığını / araç şeridi
5. İlgili vaka çalışmaları (otomatik filtre — bu hizmet etiketli vakalar)
6. SSS (5–8 soru, accordion)
7. Final CTA — "Bu hizmet için demo / fiyat teklifi"
```

### 5.2 Vaka çalışması şablonu

```
1. Hero — müşteri logosu + proje adı + özet + sektör/yıl/hizmet etiketleri
2. Sonuç metrikleri (3–4 büyük rakam)
3. Müşteri tanıtımı
4. Sorun (challenge)
5. Çözüm (solution) — yaklaşım + ekran görüntüleri
6. Süreç — milestone'lar
7. Sonuç ve etki + müşteri alıntısı
8. İlgili vakalar (2)
9. CTA
```

### 5.3 Blog

- Liste: kategori filtresi (chip'ler), 12 yazı / sayfa pagination, basit client-side arama (fuse.js)
- Yazı: başlık, kapak, yazar, tarih, okuma süresi, kategoriler, MDX içerik (callout, kod bloğu, görsel, alıntı), sosyal paylaş, ilgili yazılar
- Yorum yok (ilk versiyonda)

### 5.4 Kariyer

- Liste: lokasyona/departmana göre gruplandırılmış pozisyon kartları + ekip kültürü bölümü (foto galeri + yan haklar)
- Detay: açıklama, sorumluluklar, aranan nitelikler, sunulanlar, başvuru formu (CV upload dahil)

## 6. İçerik modeli

İçerik git'te MDX olarak tutulur, frontmatter Zod şemalarıyla doğrulanır.

| Koleksiyon       | Konum                            | Frontmatter alanları                                                                                                              |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Hizmetler        | `/content/services/{tr,en}/`     | title, slug, excerpt, hero_subtitle, problem_md, approach_md, capabilities[], tech_stack[], related_cases[], faq[], cta_text, seo |
| Vaka çalışmaları | `/content/case-studies/{tr,en}/` | title, client, slug, industry, year, services[], hero_image, metrics[], excerpt, testimonial, gallery[], related_cases[], seo     |
| Blog             | `/content/blog/{tr,en}/`         | title, slug, excerpt, cover, author, published_at, reading_time, categories[], seo                                                |
| Kariyer          | `/content/jobs/{tr,en}/`         | title, slug, location, department, employment_type, posted_at, requirements[], responsibilities[], benefits[], active             |
| Statik sayfalar  | `/content/pages/{tr,en}/`        | title, slug, seo                                                                                                                  |

### 6.1 Eşik dilden eşik dile çeviri

Her dosya, aynı `slug`'a sahip eşdeğer locale dosyasıyla eşleşir. Eşleşme yoksa o dilde sayfa render edilmez ve `hreflang` ona göre düzenlenir.

## 7. i18n stratejisi

- **Kütüphane:** next-intl
- **Routing:** `app/[locale]/...`, locales `tr` (default) ve `en`
- **UI metinleri:** `/messages/tr.json` ve `/messages/en.json`
- **İçerik metinleri:** MDX dosyalarının kendisinde (`/content/.../{tr,en}/`)
- **URL slug'ları:** dile göre lokalize (`/hizmetler/finans` ↔ `/en/services/finance`); slug eşlemesi `/lib/i18n/slug-map.ts` içinde tutulur
- **Dil seçici:** üst navigasyonda; aynı sayfanın diğer dildeki karşılığına yönlendirir
- **SEO:** her sayfada `<link rel="alternate" hreflang="tr|en|x-default" />` + locale'a özel sitemap

## 8. Form ve entegrasyonlar

Üç form: genel iletişim, demo talep, kariyer başvurusu.

- **Doğrulama:** React Hook Form + Zod (server-side de aynı şema)
- **Backend:** Next.js Server Actions
- **Mail:** Resend (Vercel Marketplace) — `sales@airomeda.com` (iletişim/demo), `careers@airomeda.com` (kariyer)
  - Alıcıya otomatik teşekkür maili
  - İç ekibe bildirim maili
- **Spam koruması:** Cloudflare Turnstile (ücretsiz, düşük sürtünme)
- **Rate limiting:** Vercel Runtime Cache ile IP başına 5 form/saat
- **CV upload:** Vercel Blob (private) — başvuru bildirim mailine signed URL ekli
- **Hatalar:** form üstünde inline hata + toast; sunucu hataları için kullanıcı dostu mesaj ve Sentry log

## 9. SEO, analytics, performans

### SEO

- `generateMetadata` ile sayfa-bazlı title/description/OG
- OG görseli `next/og` ile dinamik üretim (başlık + Airomeda logosu üzerine)
- `app/sitemap.ts` — tüm MDX'leri ve locale'leri tarar, `hreflang` linkleriyle XML üretir
- `app/robots.ts` ile robots.txt
- JSON-LD: `Organization` (footer), `BreadcrumbList` (her detay sayfası), `Article` (blog), `JobPosting` (kariyer), `Service` (hizmet)
- Canonical URL'ler locale farkındalığıyla

### Analytics

- Vercel Analytics + Speed Insights (zero-config)
- Plausible isteğe bağlı (privacy-first ek opsiyon)

### Performans

- Hedef: Core Web Vitals tüm sayfalarda yeşil
- Next.js 16 Cache Components — statik kabuk + sadece dinamik kısımlar (form, kullanıcıya özel öğeler) Server Component sınırında
- `<Image>` otomatik optimize, AVIF/WebP, lazy
- `next/font` ile font subsetting
- Core marketing sayfaları full statik / ISR yok (gerek yok)

### Erişilebilirlik

- WCAG AA hedefi
- shadcn/ui + Radix UI primitives — klavye navigasyonu ve ARIA hazır
- `prefers-reduced-motion` desteği
- Kontrast: tüm metin AA seviyesinde

## 10. Görsel stil (geçici varsayılan, build sırasında iterasyon)

İlk pass'te bu varsayılanla başlanır, gerçek bileşenler üretildikten sonra renk/tipografi iterasyonu yapılır.

- **Ana zemin:** lacivert/grafit (`#0A1628` arası), beyaz/açık metin
- **Tek aksan rengi:** `#F97316` (turuncu) — enerji + güven dengesi
- **Tipografi:** Inter (sans-serif) — başlık + body
- **Stil:** modern kurumsal, temiz tipografi hiyerarşisi, az süs
- **Bileşen tabanı:** shadcn/ui + Tailwind CSS
- **Görsel öğeler:** gerçek müşteri logoları + ekip fotoğrafları + abstract gradient hero'lar (placeholder olarak)

## 11. Teknoloji yığını ve klasör yapısı

### Yığın

| Alan           | Seçim                                    |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 16 App Router, TypeScript strict |
| Bundler        | Turbopack                                |
| Styling        | Tailwind CSS + shadcn/ui (Radix UI)      |
| Content        | MDX via `@next/mdx` + `gray-matter`      |
| i18n           | next-intl                                |
| Form           | React Hook Form + Zod                    |
| Mail           | Resend SDK                               |
| File upload    | Vercel Blob (private)                    |
| Spam           | Cloudflare Turnstile                     |
| Analytics      | Vercel Analytics + Speed Insights        |
| Hosting        | Vercel (Fluid Compute default)           |
| Config         | `vercel.ts` (`@vercel/config`)           |
| Error tracking | Sentry (opsiyonel, env'e bağlı)          |

### Klasör yapısı

```
/app/[locale]/
  page.tsx                       (anasayfa)
  hizmetler/page.tsx
  hizmetler/[slug]/page.tsx
  calismalarimiz/page.tsx
  calismalarimiz/[slug]/page.tsx
  blog/page.tsx
  blog/[slug]/page.tsx
  blog/kategori/[slug]/page.tsx
  kariyer/page.tsx
  kariyer/[slug]/page.tsx
  hakkimizda/page.tsx
  iletisim/page.tsx
  kvkk/page.tsx
  cerez-politikasi/page.tsx
  layout.tsx
/app/api/
  contact/route.ts               (form server actions wrapper)
  apply/route.ts
/components/
  layout/                        Header, Footer, MegaMenu, LangSwitcher
  sections/                      Hero, ServicesGrid, CaseStudyCard, TestimonialCarousel, CTABlock, FAQ, ProcessSteps, IndustryStrip, BlogPreview
  forms/                         ContactForm, DemoForm, JobApplicationForm, FormField, TurnstileWidget
  mdx/                           Callout, CodeBlock, ImageWithCaption, MetricCard, Quote
  ui/                            shadcn primitives
/content/
  services/{tr,en}/*.mdx
  case-studies/{tr,en}/*.mdx
  blog/{tr,en}/*.mdx
  jobs/{tr,en}/*.mdx
  pages/{tr,en}/*.mdx
/lib/
  mdx.ts                         parse + render
  i18n/                          locale config + slug-map
  resend.ts                      mail clients
  blob.ts                        upload helper
  rate-limit.ts                  Runtime Cache helper
  seo.ts                         metadata + JSON-LD helpers
  schemas/                       Zod schemas (forms + frontmatter)
/messages/
  tr.json
  en.json
/public/
  logos/, og/, fonts/
vercel.ts
.env.local.example
README.md
```

## 12. Geliştirme aşamaları (kabaca)

1. **İskelet:** Next.js 16 setup, TypeScript, Tailwind, shadcn init, i18n routing, vercel.ts
2. **Layout + tasarım sistemi:** Header, Footer, color tokens, tipografi, temel bileşenler
3. **MDX altyapısı:** content loader, frontmatter validation, render pipeline
4. **Anasayfa + 7 hizmet sayfası iskeleti:** statik içerikle
5. **Vaka çalışmaları + blog:** liste/detay + filtreleme
6. **Kariyer + form altyapısı:** Resend, Turnstile, Blob entegrasyonları
7. **SEO + analytics + sitemap + JSON-LD**
8. **İçerik doldurma + EN çevirisi**
9. **Görsel stil iterasyonu** (gerçek bileşenler üzerinden)
10. **Pre-launch:** lighthouse, a11y audit, KVKK metinleri, Vercel'e deploy

## 13. Açık konular / gelecek sürümler

- **CMS gerektiğinde geçiş:** İlk sürüm MDX ile gider; ekip büyüyüp teknik olmayan kişiler içerik girmeye başlarsa Sanity veya Payload CMS'e taşıma — `/content/` Zod şemaları aynı kalır, kaynak değişir.
- **Müşteri portalı:** ilk versiyonda yok; kapsam belirginleştiğinde ayrı bir alt-proje olarak ele alınmalı.
- **Çoklu dil genişletme:** i18n altyapısı çok-dilli hazır; Arapça/Rusça eklenirse RTL desteği ek bir kalem olarak değerlendirilmeli.
- **Yorum sistemi:** blog yorumları ilk sürümde yok.
