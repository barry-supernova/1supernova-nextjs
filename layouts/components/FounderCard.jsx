import Image from 'next/image';
import React from 'react';

const FounderCard = ({ item, index, handleOpenVideoPopup }) => {
  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      data-aos="fade-up-sm"
      data-aos-delay={(index - 0.5) * 100}>
      <Image
        className="!h-full w-full max-w-full rounded-2xl object-cover"
        src={item.image}
        alt={item.name}
        width={1000}
        height={1000}
      />

      {/* if video link button is enabled */}
      {item.video_link_button && item.video_link_button.enable && (
        <button
          onClick={handleOpenVideoPopup}
          aria-label={`Play video: ${item.name}`}
          className="absolute right-4 top-4 z-10">
          <div className="group flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gray-400 hover:bg-primary">
            <div className="flex h-[85%] w-[85%] items-center justify-center rounded-full bg-white text-center text-xs text-black transition duration-300 group-hover:bg-primary group-hover:text-white">
              <svg
                width="19"
                height="22"
                viewBox="0 0 19 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.6325 1.67128C2.51863 1.60376 2.38892 1.56759 2.25655 1.56643C2.12418 1.56528 1.99386 1.59918 1.87883 1.66469C1.7638 1.73021 1.66816 1.825 1.60162 1.93944C1.53508 2.05388 1.50002 2.1839 1.5 2.31628V19.6838C1.50002 19.8162 1.53508 19.9462 1.60162 20.0606C1.66816 20.1751 1.7638 20.2698 1.87883 20.3354C1.99386 20.4009 2.12418 20.4348 2.25655 20.4336C2.38892 20.4325 2.51863 20.3963 2.6325 20.3288L17.2862 11.645C17.3982 11.5786 17.4909 11.4842 17.5553 11.3711C17.6197 11.2581 17.6535 11.1302 17.6535 11C17.6535 10.8699 17.6197 10.742 17.5553 10.6289C17.4909 10.5158 17.3982 10.4214 17.2862 10.355L2.6325 1.67128Z"
                  className="fill-primary stroke-primary group-hover:fill-white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>
      )}

      {/* Case Study Link */}
      {item.case_study_link &&
        item.case_study_link !== '#' &&
        !item?.video_link_button?.enable && (
          <a
            href={item.case_study_link}
            className="absolute right-4 top-4 z-10">
            <div
              className="group flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gray-400 hover:bg-primary"
              title="Read Case Study">
              <div className="flex h-[85%] w-[85%] items-center justify-center gap-1 rounded-full bg-white text-center text-xs text-primary transition duration-300 group-hover:bg-primary group-hover:text-white">
                Read{' '}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.92217 1.01486C6.85517 1.04244 6.75271 1.1252 6.6936 1.1922C6.50049 1.42471 6.57143 1.82274 6.83547 1.98431C6.95369 2.05919 7.04039 2.06313 8.03744 2.06313C8.62463 2.06313 9.10936 2.07496 9.10936 2.09466C9.10936 2.11042 8.06108 3.17052 6.78029 4.44737C5.49951 5.72816 4.42759 6.81978 4.39606 6.8789C4.26995 7.12323 4.37241 7.47397 4.61281 7.60008C4.76256 7.67495 4.98325 7.67495 5.12118 7.60402C5.18029 7.57249 6.27192 6.50057 7.55271 5.21978C8.82956 3.93899 9.88965 2.89072 9.90542 2.89072C9.92512 2.89072 9.93694 3.37151 9.93694 3.95476C9.93694 5.13702 9.94483 5.1922 10.1852 5.33407C10.264 5.38136 10.3823 5.41289 10.4966 5.41289C10.6502 5.41289 10.7094 5.38924 10.8197 5.29072C10.8985 5.22372 10.9773 5.1055 11.001 5.02668C11.0246 4.93604 11.0404 4.21092 11.0404 3.16658C11.0404 1.55476 11.0325 1.44047 10.9616 1.28284C10.9025 1.15279 10.8473 1.09762 10.7172 1.0385C10.5557 0.967566 10.4493 0.959684 8.79409 0.963625C7.42266 0.963625 7.01281 0.975448 6.92217 1.01486Z"
                    className="fill-primary group-hover:fill-white"
                  />
                  <path
                    d="M2.1176 2.18142C1.64469 2.33118 1.26242 2.70162 1.06144 3.20211L0.970798 3.4228L0.958975 6.39817C0.947152 9.57453 0.951093 9.70852 1.13631 10.0987C1.2703 10.3824 1.6171 10.7292 1.90085 10.8632C2.29099 11.0484 2.42498 11.0524 5.60134 11.0405C8.57671 11.0287 8.57671 11.0287 8.78952 10.942C9.30183 10.7331 9.67228 10.3509 9.81809 9.87798C9.88902 9.64152 9.89691 9.51541 9.89691 8.29374C9.89691 7.04842 9.89297 6.96172 9.81809 6.84349C9.66045 6.58339 9.25848 6.50852 9.03385 6.69768C8.81316 6.8829 8.81316 6.87108 8.79346 8.29768L8.77375 9.62182L8.67523 9.73216C8.4703 9.95285 8.56489 9.94497 5.41612 9.94497H2.50774L2.35405 9.85433C2.03878 9.67305 2.05454 9.85827 2.05454 6.58339C2.05454 3.43463 2.04666 3.52921 2.26735 3.32428L2.37769 3.22576L3.70183 3.20605C5.12843 3.18635 5.11661 3.18635 5.30183 2.96566C5.49099 2.74103 5.41612 2.33906 5.15602 2.18142C5.03779 2.10655 4.95109 2.10261 3.69001 2.10655C2.48804 2.10655 2.32646 2.11443 2.1176 2.18142Z"
                    className="fill-primary group-hover:fill-white"
                  />
                </svg>
              </div>
            </div>
          </a>
        )}

      {/* Gradient Background */}

      <svg
        className="z-1 absolute bottom-0 left-0"
        width="410"
        height="301"
        viewBox="0 0 410 301"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_1695_2202)">
          <circle
            cx="79"
            cy="341"
            r="241"
            fill="url(#paint0_linear_1695_2202)"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_1695_2202"
            x="-262"
            y="0"
            width="682"
            height="682"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="50"
              result="effect1_foregroundBlur_1695_2202"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1695_2202"
            x1="-193.862"
            y1="20.3463"
            x2="504.556"
            y2="414.932"
            gradientUnits="userSpaceOnUse">
            <stop stopColor="#0AA5FE" />
            <stop offset="0.255208" stopColor="#02DDEB" />
            <stop offset="0.46875" stopColor="#FDD13B" />
            <stop offset="0.729167" stopColor="#FF8F81" />
            <stop offset="1" stopColor="#C14ECF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-0 z-[20]">
        <div className="p-4">
          <Image
            width={item.brand_logo.width}
            height={item.brand_logo.height}
            src={item.brand_logo.file}
            alt={item.name}
            className="w-[60px]"
          />
          <h3 className="mb-1 mt-3 text-h5">{item.name}</h3>
          <span className="text-sm">{item.designation}</span>
          {item.description && (
            <p className="mt-2 text-sm">{item.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FounderCard;
