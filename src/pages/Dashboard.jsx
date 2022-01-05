import React from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

export const Dashboard = () => {
  const { accountId } = useStore();

  const complaint = {
    title: 'complaint',
    description: 'complaint',
    location: 'complaint',
    voteCount: 'complaint',
    status: 'complaint',
  };

  return (
    <div className="page-bg" key="0">
      <header className="flex">
        <nav className="border-r-4 border-blue-100" style={{ minWidth: '125px', minHeight: '100vh' }}>
          <div className="w-full py-10">
            <Link to={routes.Home} className="ml-auto block text-center">
              <img src={require('../assets/img/communite-logo.png')} alt="" className="mx-auto" />
            </Link>
          </div>
          <ul className="mt-48">
            <li className="mt-8 border-r-8 border-purple-500">
              <Link to={routes.Dashboard} className="block py-2 hover:bg-gray-200">
                <img src={require('../assets/img/dashboard.png')} alt="" className="mx-auto" />
              </Link>
            </li>
            <li className="mt-8">
              <Link to={routes.Form} className="block py-2 hover:bg-gray-200">
                <img src={require('../assets/img/form.png')} alt="" className="mx-auto" />
              </Link>
            </li>
          </ul>
        </nav>
        <main className="block mr-auto" style={{ height: '100vh' }}>
          <nav className="w-full pt-12 ml-10">
            <h1 className="text-2xl text-gray-900 font-semibold">Compliants and suggestions</h1>
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
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-10 mx-10">
            <div
              v-for="complaint in  complaints"
              key="complaint.id"
              className="rounded-3xl shadow-2xl mt-8 px-6 pt-10 pb-4 card-img"
            >
              <h3 className="text-xl text-gray-900 font-medium ">{complaint.title}</h3>
              <h3 className="text-xl text-gray-600 font-medium mt-2">Description:</h3>
              <p className="text-lg text-gray-900 font-semibold">{complaint.description}</p>
              <h3 className="text-xl text-gray-600 font-medium mt-2">Location:</h3>
              <p className="text-lg text-gray-900 font-semibold">{complaint.location}</p>
              <div className="flex mt-2">
                <h3 className="text-xl text-gray-600 font-medium">Votes:</h3>
                <p className="text-xl text-gray-900 font-semibold ml-4">{complaint.voteCount}</p>
              </div>
              <div className="flex mt-2">
                <h3 className="text-xl text-gray-600 font-medium">Status:</h3>
                <p className="text-xl text-gray-900 font-semibold ml-4">{complaint.status}</p>
              </div>
              <div v-if="votes[complaint.id]" className="flex justify-center">
                <button
                  click="removeVoteForComplaint(complaint.id)"
                  className="inline-block bg-purple-900 hover:bg-purple-800 text-lg text-white text-center font-bold rounded-full px-4 py-2 mt-6"
                >
                  Remove Vote
                </button>
              </div>
              <div v-else className="flex justify-center">
                <button
                  click="voteForComplaint(complaint.id)"
                  className="inline-block bg-purple-500 hover:bg-purple-400 text-lg text-white text-center font-bold rounded-full px-4 py-2 mt-6"
                >
                  Vote
                </button>
              </div>
            </div>
          </div>
        </main>
        <section className="px-10 border-l-4 border-blue-100">
          <div className="w-96 mt-12">
            <a
              type="button"
              click="signOut"
              className="flex  items-center text-gray-900 bg-white hover:bg-gray-50 active:shadow-none py-2 rounded-2xl shadow-2xl text-xl text-center font-semibold flex item-center justify-center"
            >
              <img src={require('../assets/img/near-logo.png')} alt="near-logo" />
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
                {/* <!-- <p class="text-sm">logout</p> --> */}
              </div>
            </a>
          </div>
          <div className="w-full mt-24 flex justify-center">
            <Link
              to={routes.Form}
              class="bg-purple-500 hover:bg-purple-400 text-white text-lg font-semibold py-4 px-8 rounded-full"
            >
              New compliant
            </Link>
          </div>
        </section>
      </header>
    </div>
  );
};
