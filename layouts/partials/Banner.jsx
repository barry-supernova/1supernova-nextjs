import ArrowButton from '@components/ArrowButton';
import ImageFallback from '@components/ImageFallback';
import config from '@config/config';
import PortalModal from '@layouts/helpers/PortalModal';
import { markdownify } from '@lib/utils/textConverter';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useOnClickOutside } from 'usehooks-ts';
import Founders from './Founders';
import VideoBG from './VideoBG';

// Links the popup player can actually play; anything else (e.g. a web page)
// is opened as a normal link instead of an endless-loading video popup.
const VIDEO_LINK_PATTERN =
  /youtube\.com|youtu\.be|vimeo\.com|open\.spotify\.com|wistia\.|loom\.com|\.(mp4|webm|mov|m3u8)(\?|$)/i;

// Only needed once the video popup is opened
const ReactPlayerWrapperV2 = dynamic(
  () => import('@components/ReactPlayerWrapperV2'),
  { ssr: false }
);

const Banner = ({ banner, founders }) => {
  const handleOpenVideoPopup = () => {
    setIsVideoPopupOpen(true);
  };
  const handleCloseVideoModal = () => {
    setIsVideoPopupOpen(false);
  };
  const videoPopupRef = useRef(null);
  const [isVideoPopupOpen, setIsVideoPopupOpen] = useState(false);
  useOnClickOutside(videoPopupRef, handleCloseVideoModal);

  const { badge } = banner;
  const videoLink = banner.video_button.full_link?.trim();
  const isVideoLink = VIDEO_LINK_PATTERN.test(videoLink);
  const VideoButtonTag = isVideoLink ? 'button' : 'a';
  const videoButtonProps = isVideoLink
    ? { onClick: handleOpenVideoPopup, 'aria-label': 'Play Video' }
    : { href: videoLink, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <section className="relative overflow-hidden pb-16 pt-12 after:absolute after:inset-0 after:z-20 after:h-full after:w-full after:bg-dark-primary/70 after:content-[''] md:pt-8">
      <div className="relative z-30 flex flex-col justify-around gap-y-10 sm:min-h-[600px]">
        <div className="container relative z-50 text-center">
          {badge && badge.enable && (
            <div data-aos="fade-up-sm">
              <div className="mx-auto mb-6 flex max-w-max flex-wrap items-center justify-center gap-4 rounded-full">
                <div className="flex items-center">
                  {badge.images &&
                    badge.images.length &&
                    badge.images.map((image, index) => (
                      <ImageFallback
                        key={image}
                        width={60}
                        height={60}
                        className="bg-light border-1 relative -mr-2 aspect-square size-10 rounded-full bg-light-quaternary"
                        style={{ zIndex: `${index}` }}
                        src={image}
                        alt="Badge"
                      />
                    ))}
                </div>
                <span className="px-4 text-sm font-medium text-light-primary md:text-base">
                  {badge.label}
                </span>
              </div>
            </div>
          )}
          <div data-aos="fade-up">
            {markdownify(
              banner.title,
              'h1',
              'text-banner mx-auto mb-8 w-fit text-h3/tight md:text-h1 font-medium [&>strong]:!text-secondary-600'
            )}
          </div>
          <p className="sr-only">{config.metadata.meta_description}</p>
          <div data-aos="fade-up" data-aos-delay="50">
            {markdownify(
              banner.subtitle,
              'p',
              'sm:max-w-[600px] mx-auto mb-10 md:text-xl'
            )}
          </div>

          {banner.quote && banner.quote.enable && (
            <div
              className="mx-auto mt-8 max-w-[400px]"
              data-aos="fade-up"
              data-aos-delay="150">
              {markdownify(
                banner.quote.title,
                'p',
                'text-light-quaternary opacity-80 max-w-[340px] mx-auto'
              )}
              <Swiper
                loop={true}
                modules={[Autoplay]}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: false,
                }}>
                {banner.quote.items.map((item, index) => (
                  <SwiperSlide key={index}>
                    {markdownify(
                      item,
                      'span',
                      'font-secondary text-3xl font-medium text-secondary-600'
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-8">
            {banner.button && banner.button.enable && (
              <ArrowButton
                label={banner.button.label}
                link={banner.button.link}
                data-aos="fade-up"
                data-aos-delay="150"
                className="rounded-xl bg-secondary-600 px-5 py-3 text-dark-primary"
              />
            )}
            {banner.video_button.enable && (
              <VideoButtonTag
                data-aos="fade-up"
                data-aos-delay="100"
                className=" group/banner-button mx-0 flex items-center gap-2 "
                {...videoButtonProps}>
                <span className="group-hover/banner-button:btn-hover-scale-effect relative z-10 grid size-[54px] min-w-min place-items-center rounded-full bg-secondary-600 text-white group-hover/banner-button:bg-secondary-1000 ">
                  <svg
                    className="ml-0.5 text-3xl text-dark-primary"
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 010 1.393z"></path>
                  </svg>
                </span>
                <span className=" -ml-5 grid size-[54px] min-w-min place-items-center overflow-hidden rounded-full border border-secondary-200/50">
                  <ImageFallback
                    width={80}
                    height={80}
                    className="size-full object-cover"
                    src={
                      banner.video_button.image
                        ? banner.video_button.image
                        : '/images/BarryStamos-r.jpg'
                    }
                    alt=""
                  />
                </span>

                <div className="flex flex-col items-start text-white">
                  {markdownify(
                    banner.video_button.label,
                    'span',
                    'text-[1rem] font-medium leading-none mb-1'
                  )}
                  {markdownify(
                    banner.video_button.subtitle,
                    'span',
                    'text-xs leading-[1] font-medium text-light-primary/50 text-left'
                  )}
                </div>
              </VideoButtonTag>
            )}

            {/* Video Popup  Modal */}
            {isVideoPopupOpen && banner.video_button.enable && isVideoLink && (
              <PortalModal>
                <PortalModal.Close handleClose={handleCloseVideoModal} />
                <div className="mx-auto w-[800px]" ref={videoPopupRef}>
                  <ReactPlayerWrapperV2 url={videoLink} autoplay={true} />
                </div>
              </PortalModal>
            )}
          </div>
        </div>

        <Founders founders={founders} />

        <div
          className="banner-image banner-image-left -z-10"
          data-aos="fade-right"
          data-aos-delay="350">
          <Image
            src="/images/chakra.svg"
            alt="supernova"
            width={550}
            height={550}
          />
        </div>
        <div
          className="banner-image banner-image-right -z-10"
          data-aos="fade-left"
          data-aos-delay="350">
          <Image
            src="/images/chakra.svg"
            alt="supernova"
            width={500}
            height={500}
          />
        </div>
      </div>
      <div className="video-background">
        <VideoBG
          background_youtube_video_id={banner.background_youtube_video_id}
        />
      </div>
    </section>
  );
};

export default Banner;
