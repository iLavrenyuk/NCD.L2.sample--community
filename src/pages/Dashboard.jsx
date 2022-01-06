import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '../store';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { RouterBar } from '../components/RouterBar';
import { alreadyVoted, getComplaints, removeVote, signOut, voteComplaint } from '../services/near';

export const Dashboard = () => {
  const { accountId, setAccountId, setApiError } = useStore();

  const [complaints, setComplaints] = useState();
  const [votes, setVotes] = useState();

  const handleSignOut = () => {
    signOut();
    setAccountId(null);
  };

  const handleVoteForComplaint = async (id) => {
    const idToInt = parseInt(id);
    try {
      await voteComplaint(idToInt);
      getData();
    } catch (e) {
      setApiError(e);
    }
  };

  const handleRemoveVoteForComplaint = async (id) => {
    const idToInt = parseInt(id);
    try {
      await removeVote(idToInt);
      getData();
    } catch (e) {
      setApiError(e);
    }
  };

  const getData = useCallback(async () => {
    try {
      setComplaints(await getComplaints());
      setVotes(await alreadyVoted(accountId));
    } catch (e) {
      setApiError(e);
    }
  }, [accountId, setApiError]);

  useEffect(() => {
    getData();
  }, [getData]);

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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-10 mx-10">
          {complaints ? (
            complaints?.map((complaint) => (
              <div key={complaint.id} className="rounded-3xl shadow-2xl mt-8 px-6 pt-10 pb-4 card-img">
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
                <div className="flex justify-center">
                  {votes?.[complaint.id] ? (
                    <button
                      onClick={() => handleRemoveVoteForComplaint(complaint.id)}
                      className="inline-block bg-purple-900 hover:bg-purple-800 text-lg text-white text-center font-bold rounded-full px-4 py-2 mt-6"
                    >
                      Remove Vote
                    </button>
                  ) : (
                    <button
                      onClick={() => handleVoteForComplaint(complaint.id)}
                      className="inline-block bg-purple-500 hover:bg-purple-400 text-lg text-white text-center font-bold rounded-full px-4 py-2 mt-6"
                    >
                      Vote
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-3xl shadow-2xl mt-8 px-6 pt-10 pb-4 card-img">
              <h3 className="text-xl text-gray-900 font-medium pb-5">There is no data</h3>
            </div>
          )}
        </div>
      </main>
      <section className="relative px-5 mx-10 border-l-4 border-blue-100 w-96">
        <div className="fixed">
          <div className="flex justify-center w-96 mt-12">
            <button
              onClick={handleSignOut}
              className="flex items-center text-gray-900 bg-white hover:bg-gray-50 active:shadow-none p-2 rounded-2xl shadow-2xl text-xl text-center font-semibold flex item-center justify-center"
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
                <p className="text-sm">logout</p>
              </div>
            </button>
          </div>
          <div className="w-full mt-24 flex justify-center">
            <Link
              to={routes.CreateCompliant}
              className="bg-purple-500 hover:bg-purple-400 text-white text-lg font-semibold py-4 px-8 rounded-full"
            >
              New compliant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
