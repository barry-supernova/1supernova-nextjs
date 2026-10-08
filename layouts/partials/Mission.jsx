import { markdownify } from '@lib/utils/textConverter';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

const Mission = ({ mission }) => {
  const { enable, main_image, comparison_image, headings, testimonial } =
    mission.frontmatter;

  return (
    enable === true && (
      <section id="mission" className="mission py-24">
        <div className="container">
          <div className="row gy-5 items-center">
            <div className="lg:col-6">
              <div className="flex flex-col gap-y-8 lg:gap-y-16 lg:pe-10">
                {headings.map((item, index) => (
                  <div key={index}>
                    <div data-aos="fade-up-sm">
                      {markdownify(
                        item.title,
                        index === 0 ? 'h2' : 'h3',
                        (index === 0 ? ' h2 mb-4' : ' h5 capitalize mb-4') +
                          ' [&>strong]:text-yellow-500'
                      )}
                    </div>
                    <div data-aos="fade-up-sm" data-aos-delay="100">
                      {markdownify(
                        item.description,
                        'p',
                        (index === 0 ? 'text-slate-50/50' : '') + ' text-base'
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-6 lg:ps-10">
              <div className="flex flex-col gap-y-10">
                {
                  <div data-aos="fade-up-sm" data-aos-delay={100}>
                    <Image
                      className="w-full object-cover object-top"
                      width={514}
                      height={288}
                      src={main_image}
                      alt={'pvc'}
                    />
                  </div>
                }
                {
                  <div data-aos="fade-up-sm" data-aos-delay={150}>
                    <Image
                      className="w-full object-cover object-top"
                      width={514}
                      height={288}
                      src={comparison_image}
                      alt={'pvc'}
                    />
                  </div>
                }
                {testimonial && (
                  <div className="" data-aos="fade-up-sm" data-aos-delay={300}>
                    {testimonial.content && (
                      <div className="">
                        {markdownify(
                          testimonial.content,
                          'p',
                          'text-lg text-slate-50/80'
                        )}
                      </div>
                    )}
                    <div className="mt-4 flex items-center gap-4">
                      {testimonial.customer_avatar && (
                        <Image
                          className="h-14 w-14 rounded-full"
                          src={testimonial.customer_avatar}
                          width={56}
                          height={56}
                          alt={testimonial.customer_name}
                        />
                      )}
                      <div>
                        {testimonial.customer_name && (
                          <div className="text-lg text-slate-50/70">
                            {markdownify(
                              testimonial.customer_name,
                              'p',
                              'text-lg text-slate-50/70'
                            )}
                          </div>
                        )}
                        {testimonial.customer_profession && (
                          <div className="uppercase">
                            {markdownify(
                              testimonial.customer_profession,
                              'p',
                              'uppercase text-xs opacity-60'
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Mission;
