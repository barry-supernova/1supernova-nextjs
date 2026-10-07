import Logo from '@components/Logo';
import config from '@config/config.json';
import menu from '@config/menu.json';
import settings from '@config/settings.json';
import { markdownify } from '@lib/utils/textConverter';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Header = () => {
  // destructuring the main menu from menu object
  const { main } = menu;

  // get current path
  const { asPath } = useRouter();

  // logo source
  const { logo } = config.site;

  // navbar open/close
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const handleClick = () => {
    // Only set overflow for mobile viewports
    if (window.innerWidth < 1024) {
      setToggleNavbar(!toggleNavbar);
      document.body.style.overflow = toggleNavbar ? 'unset' : 'hidden';
      const navToggle = document.getElementById('nav-toggle');
      if (navToggle) {
        navToggle.checked = !toggleNavbar;
      }
    }
  };

  useEffect(() => {
    const announcement = document.querySelector('.announcement-bar');
    const navbarBrand = document.querySelector('.navbar-brand');
    const navbar = document.querySelector('.navbar');
    function setHeight() {
      if (window.innerWidth < 540) {
        toggleNavbar
          ? (navbar.style.height = `calc(100vh - (${announcement.offsetHeight}px + ${navbarBrand.offsetHeight}px))`)
          : (navbar.style.height = null);
      }
    }
    setHeight();
    window.addEventListener('resize', setHeight);
  }, [toggleNavbar]);

  return (
    <header className={`header ${toggleNavbar ? 'navbar-open' : ''}`}>
      <nav className="navbar container items-start px-0 sm:items-center sm:px-4">
        {/* logo */}
        <div className="order-0 mr-auto pl-4 sm:pl-0 lg:mr-0">
          <Logo src={logo} />
        </div>
        {/* navbar toggler */}
        <input
          id="nav-toggle"
          type="checkbox"
          className="hidden"
          onClick={handleClick}
        />
        <label
          id="show-button"
          htmlFor="nav-toggle"
          className="order-2 flex cursor-pointer items-center pr-4 lg:order-1 sm:pr-0 lg:hidden">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary">
            <path
              opacity="0.4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 9.89159C5 8.84689 5.84689 8 6.89159 8H32.1128C33.1575 8 34.0044 8.84689 34.0044 9.89159C34.0044 10.9363 33.1575 11.7832 32.1128 11.7832H6.89159C5.84689 11.7832 5 10.9363 5 9.89159Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 19.98C5 18.9353 5.84689 18.0884 6.89159 18.0884H32.1128C33.1575 18.0884 34.0044 18.9353 34.0044 19.98C34.0044 21.0247 33.1575 21.8716 32.1128 21.8716H6.89159C5.84689 21.8716 5 21.0247 5 19.98Z"
              fill="currentColor"
            />
            <path
              opacity="0.4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 30.0681C5 29.0234 5.84689 28.1765 6.89159 28.1765H32.1128C33.1575 28.1765 34.0044 29.0234 34.0044 30.0681C34.0044 31.1128 33.1575 31.9597 32.1128 31.9597H6.89159C5.84689 31.9597 5 31.1128 5 30.0681Z"
              fill="currentColor"
            />
          </svg>
        </label>
        <label
          id="hide-button"
          htmlFor="nav-toggle"
          className="order-2 hidden cursor-pointer items-center pr-4 lg:order-1 sm:pr-0">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-light-primary">
            <path
              opacity="0.4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.53889 30.551C7.74255 29.7547 7.74255 28.4636 8.53889 27.6672L27.7643 8.44186C28.5606 7.64552 29.8517 7.64552 30.6481 8.44186C31.4444 9.2382 31.4444 10.5293 30.6481 11.3257L11.4227 30.551C10.6264 31.3474 9.33523 31.3474 8.53889 30.551Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.44192 8.86012C9.23826 8.06377 10.5294 8.06377 11.3257 8.86012L30.5511 28.0855C31.3474 28.8818 31.3474 30.173 30.5511 30.9693C29.7548 31.7656 28.4636 31.7656 27.6673 30.9693L8.44192 11.7439C7.64558 10.9476 7.64558 9.65646 8.44192 8.86012Z"
              fill="currentColor"
            />
          </svg>
        </label>
        {/* /navbar toggler */}

        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden h-full w-full lg:order-1 md:h-auto lg:flex lg:w-auto lg:space-x-2">
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span className="nav-link inline-flex items-center">
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:invisible lg:absolute lg:block lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children.map((child, i) => (
                      <li className="nav-dropdown-item" key={`children-${i}`}>
                        <Link
                          onClick={handleClick}
                          href={child.url}
                          className={`nav-dropdown-link block ${
                            asPath === child.url && 'active'
                          }`}>
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    onClick={handleClick}
                    href={menu.url}
                    className={`nav-link block ${
                      asPath === menu.url && 'active'
                    }`}>
                    {menu.name}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
          <li className="mobile-cta">
            <p className="z-10 mb-6 text-2xl font-semibold">
              {config.site.mobile_nav_text}
            </p>
            <Link
              className="btn btn-sm btn-light py-4 leading-none"
              href={settings.header_cta_link}
              target="_blank"
              rel="noopener nofollow noreferrer">
              {markdownify(settings.header_cta_label, 'span', '')}
            </Link>
            <Link
              className="mt-5 block text-lg text-white transition hover:text-primary-200"
              href={settings.header_login_link}>
              {settings.header_login_label}
            </Link>
          </li>
        </ul>

        <div className="order-1 mx-5 hidden items-center lg:order-2 sm:flex lg:mx-0">
          <Link
            className="mr-5 text-base text-white transition hover:text-primary-200"
            href={settings.header_login_link}>
            {settings.header_login_label}
          </Link>
          <Link
            className="btn btn-sm btn-dark py-4 leading-none"
            href={settings.header_cta_link}
            target="_blank"
            rel="noopener nofollow noreferrer">
            {markdownify(settings.header_cta_label, 'span', '')}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
