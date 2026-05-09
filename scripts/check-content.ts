import {
  listServices,
  listCaseStudies,
  listBlogPosts,
  listJobs,
} from '@/lib/mdx';

(async () => {
  let failed = false;
  for (const locale of ['tr', 'en'] as const) {
    try {
      const services = await listServices(locale);
      console.log(`[${locale}] services: ${services.length}`);
      for (const s of services) console.log(`  ✓ ${s.slug} — ${s.title}`);

      const cases = await listCaseStudies(locale);
      console.log(`[${locale}] case-studies: ${cases.length}`);
      for (const c of cases) console.log(`  ✓ ${c.slug} — ${c.title}`);

      const posts = await listBlogPosts(locale);
      console.log(`[${locale}] blog: ${posts.length}`);
      for (const p of posts) console.log(`  ✓ ${p.slug} — ${p.title}`);

      const jobs = await listJobs(locale);
      console.log(`[${locale}] jobs: ${jobs.length}`);
      for (const j of jobs) console.log(`  ✓ ${j.slug} — ${j.title}`);
    } catch (err) {
      console.error(`[${locale}] FAILED:`, err);
      failed = true;
    }
  }
  if (failed) process.exit(1);
})();
