import AnimatedText from '@components/AnimatedText';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { markdownify } from '@lib/utils/textConverter';
import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import { LuUsers } from 'react-icons/lu';
import Link from 'next/link';
import DynamicIcon from '@components/DynamicIcon';

const ApplySteps = ({ data }) => {
  const {
    enable,
    title,
    subtitle,
    background_image,
    button,
    step_list,
    card_list,
  } = data;
  return (
    enable && (
      <section
        id="join_the_supernova_network"
        className=" relative isolate py-24 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-dark-primary/80 before:to-dark-primary/20"
        style={{
          backgroundImage: `url(${background_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}>
        <div className="container text-balance text-center">
          <div data-aos="fade-up-sm">
            <AnimatedText
              tag="h2"
              className="mb-4 font-medium"
              content={title}
            />
          </div>
          <div data-aos="fade-up-sm" data-aos-delay="100">
            {markdownify(subtitle, 'p', 'text-light-tertiary md:text-xl')}
          </div>
          <div
            className="neon-line mx-auto mt-6 w-24"
            data-aos="fade-up"
            data-aos-delay="200"
          />

          <div className="my-12 grid gap-8 md:grid-cols-3 md:gap-10">
            {step_list.map((step, index) => (
              <Link
                href={step.link}
                className="block"
                data-aos="fade-up"
                data-aos-delay={index * 200}
                key={index}>
                <div className="neon-card h-full">
                  <div className="neon-icon ">
                    <DynamicIcon icon={step.icon} />
                  </div>
                  <h3 className="text-2xl font-bold text-light-primary">
                    {step.title}
                  </h3>
                  <p className="text-base-sm text-light-tertiary/80">
                    {step.content}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div data-aos="fade-up">
            {button.enable && (
              <Link
                href={button.link}
                className="neon-button mx-auto block max-w-max rounded-xl bg-secondary-600 px-6 py-3 text-base-sm font-semibold text-dark-primary">
                {button.label}
              </Link>
            )}
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
            {card_list.map((card, index) => (
              <div
                data-aos="fade-up-sm"
                data-aos-delay={index * 100}
                key={index}
                className="flex items-start gap-4 rounded-lg bg-dark-quaternary/80 p-4 text-start text-lg backdrop-blur-md transition-all duration-300">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className=" min-h-6 min-w-[1lh]"
                  xmlns="http://www.w3.org/2000/svg">
                  <mask
                    id="mask0_1455_3981"
                    style={{ maskType: 'luminance' }}
                    maskUnits="userSpaceOnUse"
                    x="1"
                    y="1"
                    width="22"
                    height="22">
                    <path
                      d="M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12L11 15L17 9"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </mask>
                  <g mask="url(#mask0_1455_3981)">
                    <path
                      d="M0 0H24V24H0V0Z"
                      fill="url(#paint0_linear_1455_3981)"
                    />
                  </g>
                  <defs>
                    <linearGradient
                      id="paint0_linear_1455_3981"
                      x1="-1.58647"
                      y1="-3.96616"
                      x2="33.1895"
                      y2="15.6812"
                      gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0AA5FE" />
                      <stop offset="0.255208" stopColor="#02DDEB" />
                      <stop offset="0.46875" stopColor="#FDD13B" />
                      <stop offset="0.729167" stopColor="#FF8F81" />
                      <stop offset="1" stopColor="#C14ECF" />
                    </linearGradient>
                  </defs>
                </svg>
                {card.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default ApplySteps;
