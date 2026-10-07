import Image from 'next/image';
import { useEffect, useState } from 'react';

// Events that signal a real visitor; the YouTube embed (~2MB of video + player JS)
// is only loaded after one of these so it never competes with the initial page load.
const INTERACTION_EVENTS = [
  'pointermove',
  'pointerdown',
  'scroll',
  'keydown',
  'touchstart',
];

const VideoBG = ({ background_youtube_video_id }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setIsVideoLoaded(true);
      removeListeners();
    };
    const removeListeners = () =>
      INTERACTION_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleInteraction)
      );

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, handleInteraction, {
        once: true,
        passive: true,
      })
    );

    return removeListeners;
  }, []);

  return isVideoLoaded ? (
    <iframe
      loading="lazy"
      title="background video"
      src={`https://www.youtube.com/embed/${background_youtube_video_id}?playlist=${background_youtube_video_id}&autoplay=1&mute=1&loop=1&color=white&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=34`}></iframe>
  ) : (
    <Image
      className="aspect-[1/3] h-full object-cover object-top sm:aspect-auto"
      src={`/images/banner-bg.png`}
      alt="video thumbnail"
      width={1920}
      height={1080}
      sizes="100vw"
      fetchPriority="high"
      priority={true}
    />
  );
};

export default VideoBG;
