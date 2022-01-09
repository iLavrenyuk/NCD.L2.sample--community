import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../store';
import { alreadyVoted, getComplaints, removeVote, voteComplaint } from '../../services/near';

export const CompliantList = ({ isOwnerTicket }) => {
  const { accountId, setApiError } = useStore();

  const [complaints, setComplaints] = useState();
  const [votes, setVotes] = useState();

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
      const complaintsData = await getComplaints();
      if (isOwnerTicket) {
        setComplaints(complaintsData.filter((complaint) => complaint.ticketOwner.match(accountId)));
      } else {
        setComplaints(complaintsData);
      }
      setVotes(await alreadyVoted(accountId));
    } catch (e) {
      setApiError(e);
    }
  }, [accountId, isOwnerTicket, setApiError]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="grid grid-cols-1 gap-x-10 mx-10">
      {complaints ? (
        complaints?.map((complaint) => (
          <div key={complaint.id} className="rounded-3xl shadow-2xl mt-8 px-6 pt-10 pb-4 card-img">
            <h3 className="text-xl text-gray-900 font-bold ">{complaint.title}</h3>
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
            <div className="flex mt-2">
              <h3 className="text-xl text-gray-600 font-medium">Category:</h3>
              <p className="text-xl text-gray-900 font-semibold ml-4">{complaint.category}</p>
            </div>
            {isOwnerTicket ? null : (
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
            )}
          </div>
        ))
      ) : (
        <div className="rounded-3xl shadow-2xl mt-8 px-6 pt-10 pb-4 card-img">
          <h3 className="text-xl text-gray-900 font-medium pb-5">There is no data</h3>
        </div>
      )}
    </div>
  );
};
