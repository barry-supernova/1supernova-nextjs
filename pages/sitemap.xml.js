import config from '@config/config.json';
import { getSinglePage } from '@lib/contentParser';

// These published routes still contain placeholder/copy-of-Apollo content.
// Keep them out until their approved case-study content is ready.
const unfinishedCaseStudies = new Set(['colossal', 'health-young-minds']);
const escapeXml = (value) => value.replace(/[<>&"']/g, (character) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
}[character]));

export const getServerSideProps = ({ res }) => {
  const regularPages = getSinglePage('content')
    .filter(({ frontmatter }) => !frontmatter.noindex && !frontmatter.canonical)
    .map(({ slug }) => `/${slug}`);
  const caseStudies = getSinglePage('content/casestudy')
    .filter(({ slug, frontmatter }) => !unfinishedCaseStudies.has(slug) && !frontmatter.noindex)
    .map(({ slug }) => `/casestudy/${slug}`);
  const paths = [...new Set(['/', '/about-us', '/live', '/pe', ...regularPages, ...caseStudies])];
  // Omit lastmod until genuine per-page modification dates are available.
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${escapeXml(new URL(path, config.site.base_url).href)}</loc></url>`).join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.end(sitemap);
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
