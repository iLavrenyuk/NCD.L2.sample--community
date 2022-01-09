import React from 'react';
import { useStore } from '../../store';
import { routes } from '../../router/routes';
import { signOut } from '../../services/near';
import { CompliantList } from './CompliantList';
import { RouterBar } from '../../components/RouterBar';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const DashboardWrapper = () => {
  const { accountId, setAccountId } = useStore();

  const location = useLocation();

  const handleSignOut = () => {
    signOut();
    setAccountId(null);
  };

  return (
    <div className="flex" key="0">
      <div className="page-bg" />
      <RouterBar />
      <main className="block ml-32 mr-auto">
        <nav className="w-full pt-12 ml-10">
          <h1 className="text-2xl text-gray-900 font-semibold">Complaints and suggestions</h1>
          <div className="mt-8">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 absolute left-4 top-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input type="text" className="pl-16 h-12 w-96 h-10 rounded-2xl outline-none shadow-2xl" />
            </div>
          </div>
        </nav>
        <Outlet />
      </main>
      <section className="relative px-5 mx-10 border-l-4 border-blue-100 w-96">
        <div className="fixed flex justify-center w-96 mt-8">
          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-900 bg-white hover:bg-gray-50 active:shadow-none p-2 rounded-2xl shadow-2xl text-xl text-center font-semibold flex item-center justify-center"
          >
            <img src={require('../../assets/img/near-logo.png')} alt="near-logo" />
            <span>{accountId}</span>
            <div className="flex flex-col mx-3 items-center mt-1 ml-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <p className="text-sm">logout</p>
            </div>
          </button>
        </div>
        <div className="w-full mt-28 flex justify-center">
          {location.pathname === routes.CreateCompliant ? (
            <div className="w-full mt-6">
              <h3 className="text-xl text-gray-900 font-bold px-6">Your recent compliant</h3>
              <CompliantList isOwnerTicket />
            </div>
          ) : (
            <Link
              to={routes.CreateCompliant}
              className="fixed bg-purple-500 hover:bg-purple-400 text-white text-lg font-semibold py-4 px-8 rounded-full mt-12"
            >
              New compliant
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};
