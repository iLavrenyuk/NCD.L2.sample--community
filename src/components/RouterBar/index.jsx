import React from 'react';
import { BarItem } from './BarItem';
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
        <BarItem route={routes.Dashboard}>
          <img src={require('../../assets/img/dashboard.png')} alt="" className="mx-auto" />
        </BarItem>
        <BarItem route={routes.CreateCompliant}>
          <img src={require('../../assets/img/form.png')} alt="" className="mx-auto" />
        </BarItem>
      </ul>
    </nav>
  );
};
