import AnimatedText from '@components/AnimatedText';
import ReactPlayerWrapperV2 from '@components/ReactPlayerWrapperV2';
import PortalModal from '@layouts/helpers/PortalModal';
import { markdownify } from '@lib/utils/textConverter';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import FounderCard from '@components/FounderCard';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const TopFounders = ({ top_founders }) => {
  const handleOpenVideoPopup = () => {
    setIsVideoPopupOpen(true);
  };
  const handleCloseVideoModal = () => {
    setIsVideoPopupOpen(false);
  };
  const videoPopupRef = useRef(null);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  useOnClickOutside(videoPopupRef, handleCloseVideoModal);

  return (
    top_founders.frontmatter.enable === true && (
      <>
        <section
          id="portfolio"
          className="rising-stars bg-dark-secondary py-24">
          <div className="container xl:max-w-[900px]">
            <div data-aos="fade-up-sm">
              <AnimatedText
                tag="h2"
                className="mb-4 text-center font-medium"
                content={top_founders.frontmatter.title}
              />
            </div>
            <div data-aos="fade-up-sm" data-aos-delay="100">
              {markdownify(
                top_founders.frontmatter.subtitle,
                'p',
                'text-light-secondary md:text-xl text-center'
              )}
            </div>

            {/* Swiper Slide for Top Founders */}
            <Swiper
              className="rising-stars mt-20"
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              loop={true}
              loopedSlides={2}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true,
              }}
              centeredSlides={true}
              spaceBetween={20}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
                767: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                991: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}>
              {top_founders.frontmatter.lists.map((item, index) => (
                <SwiperSlide key={index}>
                  <FounderCard
                    item={item}
                    index={index}
                    handleOpenVideoPopup={handleOpenVideoPopup}
                  />
                  {isVideoPopupOpen && item.video_link_button.enable && (
                    <PortalModal>
                      <PortalModal.Close handleClose={handleCloseVideoModal} />
                      <div className="mx-auto w-[800px]" ref={videoPopupRef}>
                        <ReactPlayerWrapperV2
                          url={item.video_link_button.full_link}
                          autoplay={true}
                        />
                      </div>
                    </PortalModal>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </>
    )
  );
};

export default TopFounders;
