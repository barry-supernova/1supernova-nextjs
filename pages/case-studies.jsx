import Base from '@layouts/Baseof';
import { getSinglePage } from '@lib/contentParser';
import Link from 'next/link';

const tracks = ['We invest early', 'Growth stage'];

export default function CaseStudies({ caseStudies }) {
  return (
    <Base title="Case Studies">
      <section className="section-lg pt-10 md:pt-20">
        <div className="container">
          <h1 className="mb-16 text-center text-h3 font-medium md:text-h2">
            Case Studies
          </h1>
          <div className="space-y-16">
            {tracks.map((track) => {
              const studies = caseStudies.filter(
                ({ frontmatter }) => frontmatter.track === track
              );
              if (!studies.length) return null;
              return (
                <section key={track}>
                  <h2 className="mb-8 text-h4 font-medium md:text-h3">
                    {track}
                  </h2>
                  <div className="row gy-4">
                    {studies.map(({ slug, frontmatter }) => (
                      <div key={slug} className="md:col-6 lg:col-4">
                        <Link
                          href={`/casestudy/${slug}`}
                          className="block h-full rounded-3xl bg-dark-quaternary p-8 transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                          <h3 className="mb-3 text-h5 font-medium">
                            {frontmatter.title}
                          </h3>
                          {frontmatter.description && (
                            <p className="text-light-secondary">
                              {frontmatter.description}
                            </p>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </Base>
  );
}

export function getStaticProps() {
  const caseStudies = getSinglePage('content/casestudy').map(
    ({ slug, frontmatter }) => ({ slug, frontmatter })
  );
  return { props: { caseStudies } };
}
