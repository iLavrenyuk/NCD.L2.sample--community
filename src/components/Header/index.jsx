import React, { useState } from 'react';
import { useStore } from '../../store';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import { signIn } from '../../services/near';
import { HashLink } from 'react-router-hash-link';

export const Header = () => {
  const { accountId } = useStore();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleSignIn = () => {
    signIn(window.location.origin + routes.Dashboard);
  };

  return (
    <header>
      <nav className="my-12 px-24 hidden lg:flex">
        <a href="#">
          <svg className="w-14 h-14" viewBox="0 0 49 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="15" width="20" height="20" rx="10" fill="#9C69E2" />
            <rect x="29" width="20" height="35" rx="10" fill="#F063B8" />
          </svg>
        </a>
        <ul className="flex items-center ml-4 lg:ml-32 font-semibold text-gray-500">
          <li className="ml-12">
            <HashLink to="/#about" className="text-blue-900 hover:text-gray-900">
              About
            </HashLink>
          </li>
          <li className="ml-12">
            <HashLink to="/#help" className="text-blue-900 hover:text-gray-900">
              Help
            </HashLink>
          </li>
          <li className="ml-12">
            <HashLink to="/#features" className="text-blue-900 hover:text-gray-900">
              Features
            </HashLink>
          </li>
        </ul>
        {accountId ? (
          <div className="block px-8 py-1 shadow-md hover:shadow-sm rounded-full flex text-lg font-semibold text-blue-900 ml-auto items-center bg-white">
            <img src={require('../../assets/img/near-logo.png')} alt="near-logo" />
            {accountId}
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="block px-8 py-1 shadow-md hover:shadow-sm rounded-full flex text-lg font-semibold text-blue-900 ml-auto items-center bg-white"
          >
            Login with NEAR
            <img src={require('../../assets/img/near-logo.png')} alt="near-logo" />
          </button>
        )}
      </nav>
      <nav className="flex items-center my-6 px-6  lg:hidden" id="openMenu">
        <button id="burger" onClick={() => setIsOpenMenu(!isOpenMenu)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {isOpenMenu ? (
          <ul className="flex items-center ml-4 lg:ml-32 font-semibold text-gray-500">
            <li className="ml-6">
              <HashLink to="/#about" className="text-blue-900 hover:text-gray-900">
                About
              </HashLink>
            </li>
            <li className="ml-8">
              <HashLink to="/#help" className="text-blue-900 hover:text-gray-900">
                Help
              </HashLink>
            </li>
            <li className="ml-8">
              <HashLink to="/#features" className="text-blue-900 hover:text-gray-900">
                Features
              </HashLink>
            </li>
          </ul>
        ) : (
          <Link to={routes.Home} className="ml-auto">
            <svg className="w-14 h-14" viewBox="0 0 49 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="15" width="20" height="20" rx="10" fill="#9C69E2" />
              <rect x="29" width="20" height="35" rx="10" fill="#F063B8" />
            </svg>
          </Link>
        )}
      </nav>
      <div className="mx-6 lg:mx-24 relative">
        <div>
          <h2 className="text-4xl lg:text-5xl lg:text-6xl font-bold text-blue-900">
            Make your <br className="hidden lg:block" /> opinion change <br className="hidden lg:block" /> your
            community
          </h2>
        </div>
        <div className="mt-8 w-full md:w-1/2 lg:w-1/3">
          <p className="text-gray-500">
            Use blockchain technology based on the NEAR protocol to create complaints or suggestions for problems in
            your community and send them to your town hall with the assurance that they will never be eliminated.
          </p>
        </div>
        <div className="mt-10">
          <Link to={routes.Dashboard} className="bg-purple-500 hover:bg-purple-400 text-white px-9 py-4 rounded-full">
            GO to Make
          </Link>
        </div>
        <div className="block lg:absolute mt-8 lg:mt-0 right-0 top-0" style={{ zIndex: -1 }}>
          <img src={require('../../assets/img/offer-img.png')} alt="offer-img" />
        </div>
      </div>
      <div className="bg-pink-100 rounded-3xl mx-0 lg:mx-24 mt-24 lg:mt-48 py-6 lg:flex">
        <div className="lg:w-1/2">
          <img src={require('../../assets/img/second-offer.png')} alt="second-offer" className="mx-auto" />
        </div>
        <div className="block lg:flex items-center ml-auto lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl text-blue-900 font-bold w-full lg:w-96">
            Decentralize the choice of problems to be solved by the city council
          </h2>
        </div>
      </div>
    </header>
  );
};
