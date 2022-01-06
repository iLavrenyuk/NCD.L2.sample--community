import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';

export const RouterBar = () => {
  return (
    <nav className="fixed border-r-4 border-blue-100 px-6 h-screen">
      <div className="w-full py-10">
        <Link to={routes.Home} className="ml-auto block text-center">
          <img src={require('../../assets/img/community-logo.png')} alt="" className="mx-auto" />
        </Link>
      </div>
      <ul className="mt-48">
        <li className="mt-8 border-r-8 border-purple-500">
          <Link to={routes.Dashboard} className="block py-2 hover:bg-gray-200">
            <img src={require('../../assets/img/dashboard.png')} alt="" className="mx-auto" />
          </Link>
        </li>
        <li className="mt-8">
          <Link to={routes.CreateCompliant} className="block py-2 hover:bg-gray-200">
            <img src={require('../../assets/img/form.png')} alt="" className="mx-auto" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
