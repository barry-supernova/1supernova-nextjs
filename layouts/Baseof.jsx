import config from '@config/config.json';
import settings from '@config/settings.json';
import { plainify } from '@lib/utils/textConverter';
import AnnouncementBar from '@partials/AnnouncementBar';
import Footer from '@partials/Footer';
import Header from '@partials/Header';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Base = ({
  title,
  meta_title,
  description,
  keywords,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_author, meta_description, meta_keywords } =
    config.metadata;
  const { base_url } = config.site;
  const { announcement } = settings;
  const router = useRouter();
  // Canonicals identify the rendered page, without tracking queries or fragments.
  const canonicalUrl = new URL(canonical || router.asPath.split(/[?#]/)[0], base_url);
  canonicalUrl.search = '';
  canonicalUrl.hash = '';
  canonicalUrl.pathname = canonicalUrl.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.setAttribute('target', '_blank');
    });
  }, []);

  // Simple JSON-LD Schema
  const schemaLD = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.site.title,
    url: base_url,
    logo: `${base_url}${config.site.logo}`,
    description: plainify(description || meta_description),
    sameAs: [...config.social_media.map((item) => item.link).slice(0, 1)],
  };
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* title */}
        <title>
          {plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        </title>
        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaLD),
          }}
        />

        {/* canonical url */}
        {(canonical || base_url) && (
          <link
            rel="canonical"
            href={canonicalUrl.href}
            itemProp="url"
          />
        )}

        {/* noindex robots */}
        {noindex && <meta name="robots" content="noindex,nofollow" />}

        {/* meta-description */}
        <meta
          name="description"
          content={plainify(description || meta_description)}
        />

        {/* meta-keyword */}
        <meta
          name="keywords"
          content={plainify(keywords ? keywords : meta_keywords)}
        />

        {/* author from config.json */}
        <meta name="author" content={meta_author} />

        {/* og-title */}
        <meta
          property="og:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* og-description */}
        <meta
          property="og:description"
          content={plainify(description || meta_description)}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={canonicalUrl.href}
        />

        {/* twitter-title */}
        <meta
          name="twitter:title"
          content={plainify(
            meta_title ? meta_title : title ? title : config.site.title
          )}
        />

        {/* twitter-description */}
        <meta
          name="twitter:description"
          content={plainify(description ? description : meta_description)}
        />

        {/* og-image */}
        <meta
          property="og:image"
          content={`${base_url || ''}${image ? image : meta_image}`}
        />

        {/* twitter-image */}
        <meta
          name="twitter:image"
          content={`${base_url || ''}${image ? image : meta_image}`}
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="google-site-verification"
          content="gcnp8yBk4N_k4H1qWBV2h5NPgd-al3cdjy-8YyOasnU"
        />
      </Head>

      <AnnouncementBar content={announcement} />
      <Header />
      {/* main site */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Base;
