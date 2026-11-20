import Base from '@layouts/Baseof';
import { getSinglePage } from '@lib/contentParser';
import parseMDX from '@lib/utils/mdxParser';
import CallToAction from '@partials/CallToAction';
import Gallery from '@partials/Gallery';
import shortcodes from '@shortcodes/all';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';

export default function CaseStudySingle({ caseStudy, mdxContent }) {
  const { title, description, gallery, call_to_action } = caseStudy.frontmatter;
  const information = caseStudy.frontmatter.information || {};

  const {
    stage,
    industry,
    company,
    location,
    youtubeVideoId,
    youtubeVideoStartTime,
  } = information;
  const hasMedia = Boolean(youtubeVideoId || information.image);
  const hasDetails = Boolean(stage || industry || company || location);

  return (
    <Base title={title} description={description}>
      <section
        className={
          gallery?.enable
            ? ' section-lg pt-10 md:pt-20'
            : 'section-lg pb-0 pt-10 md:pt-20'
        }>
        <div className="container">
          <div className="row">
            {(information.title || title) && (
              <div className="mx-auto pb-10 lg:col-10">
                <h1
                  className="text-center text-h3 font-medium md:text-h2"
                  dangerouslySetInnerHTML={{
                    __html: information.title || title,
                  }}
                />
              </div>
            )}
            <div className="col-12">
              <div className="row gy-4">
                {hasMedia && (
                  <div className={hasDetails ? 'md:col-8 lg:col-9' : 'col-12'}>
                    <div className="relative size-full overflow-hidden rounded-lg md:rounded-2xl">
                      {youtubeVideoId ? (
                        <iframe
                          loading="lazy"
                          title="background video"
                          width={1200}
                          height={600}
                          className="size-full min-h-[250px]"
                          src={`https://www.youtube.com/embed/${youtubeVideoId}?playlist=${youtubeVideoId}&autoplay=0&mute=0&loop=1&color=white&controls=1&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=${youtubeVideoStartTime || 0}`}></iframe>
                      ) : (
                        <Image
                          className={
                            hasDetails
                              ? 'size-full object-cover object-left-top md:absolute md:inset-0'
                              : 'h-auto w-full object-cover'
                          }
                          width={850}
                          height={450}
                          src={information.image}
                          alt={information.title || title}
                        />
                      )}
                    </div>
                  </div>
                )}
                {hasDetails && (
                  <div className={hasMedia ? 'md:col-4 lg:col-3' : 'col-12'}>
                    <div className="space-y-5 divide-y divide-white/10 rounded-xl bg-dark-quaternary p-7 md:p-10">
                      {stage && (
                        <div className="">
                          <p className="mb-2 text-base-sm opacity-80">
                            Company
                          </p>
                          <p
                            className="text-h6"
                            dangerouslySetInnerHTML={{ __html: stage }}
                          />
                        </div>
                      )}
                      {industry && (
                        <div className="pt-4">
                          <p className="mb-2 text-base-sm opacity-80">
                            Industry
                          </p>
                          <p
                            className="text-h6"
                            dangerouslySetInnerHTML={{ __html: industry }}
                          />
                        </div>
                      )}
                      {location && (
                        <div className="pt-4">
                          <p className="mb-2 text-base-sm opacity-80">
                            Location
                          </p>
                          <p
                            className="text-h6"
                            dangerouslySetInnerHTML={{ __html: location }}
                          />
                        </div>
                      )}
                      {company && (
                        <div className="pt-4">
                          <p className="mb-2 text-base-sm opacity-80">
                            Company Size
                          </p>
                          <p
                            className="text-h6"
                            dangerouslySetInnerHTML={{ __html: company }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 bg-dark-secondary  md:mt-20 md:p-10">
          <div className="container py-8">
            <div className="content">
              <MDXRemote {...mdxContent} components={shortcodes} />
            </div>
          </div>
        </div>
      </section>
      {gallery?.enable && <Gallery gallery={gallery} />}
      {call_to_action?.enable && <CallToAction cta={call_to_action} />}
    </Base>
  );
}

export async function getStaticPaths() {
  const caseStudies = await getSinglePage('content/casestudy');

  const paths = caseStudies.map((caseStudy) => ({
    params: { slug: caseStudy.slug },
  }));

  return {
    paths,
    fallback: false, // If fallback is false, any invalid slugs will show a 404 page
  };
}

export async function getStaticProps({ params }) {
  const caseStudies = await getSinglePage('content/casestudy');
  const caseStudy = caseStudies.find(
    (study) => study.slug.toLowerCase() === params.slug.toLowerCase()
  );
  if (!caseStudy) return { notFound: true };
  const mdxContent = await parseMDX(caseStudy.content);
  return {
    props: {
      caseStudy,
      mdxContent,
    },
  };
}
