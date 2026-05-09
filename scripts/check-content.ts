import { listServices } from '@/lib/mdx';

(async () => {
  for (const locale of ['tr', 'en'] as const) {
    try {
      const services = await listServices(locale);
      console.log(`[${locale}] ${services.length} services loaded`);
      for (const s of services) console.log(`  ✓ ${s.slug} — ${s.title}`);
    } catch (err) {
      console.error(`[${locale}] FAILED:`, err);
      process.exit(1);
    }
  }
})();
