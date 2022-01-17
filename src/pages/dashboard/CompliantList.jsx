import React, { useCallback, useEffect, useState } from 'react';
import { useStore } from '../../store';
import { alreadyVoted, getComplaints, removeVote, voteComplaint } from '../../services/near';

export const CompliantList = ({ isOwnerTicket }) => {
  const { accountId, setApiError, searchInput, contractId } = useStore();

  const [complaints, setComplaints] = useState();
  const [displayComplaints, setDisplayComplaints] = useState();
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
      const ownerComplaints = isOwnerTicket
        ? complaintsData.filter((complaint) => complaint.ticketOwner.match(accountId))
        : complaintsData;
      setComplaints(ownerComplaints);
      setDisplayComplaints(ownerComplaints);
      setVotes(await alreadyVoted(accountId));
    } catch (e) {
      setApiError(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, isOwnerTicket, setApiError, contractId]);

  useEffect(() => {
    getData();
  }, [getData]);

  const searchableColumns = ['title', 'description', 'location'];

  useEffect(() => {
    if (complaints) {
      let highlightData = complaints.map((message) => {
        const highlightText = {};
        searchableColumns.map((keyColumn) => {
          highlightText[keyColumn] = message?.[keyColumn].replace(
            new RegExp(
              searchInput.replace(/[*[&<$.|^>\\/\]"?()+]/g, (s) => {
                return '\\' + s;
              }),
              'gi'
            ),
            (str) => {
              return str ? `${'<mark>' + str + '</mark>'}` : str;
            }
          );
        });
        return { ...message, ...highlightText };
      });

      if (searchInput) {
        highlightData = highlightData.filter((message, id) =>
          searchableColumns.some((keyColumn) => message[keyColumn] !== complaints[id][keyColumn])
        );
      }

      setDisplayComplaints(highlightData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return (
    <div className="grid grid-cols-1 gap-x-10 mx-10">
      {displayComplaints?.length ? (
        displayComplaints?.map((complaint) => (
          <div key={complaint.id} className="rounded-3xl shadow-2xl mt-8 px-6 pt-10 pb-4 card-img">
            <h3 className="text-xl text-gray-900 font-bold" dangerouslySetInnerHTML={{ __html: complaint.title }} />
            <h3 className="text-xl text-gray-600 font-medium mt-2">Description:</h3>
            <p
              className="text-lg text-gray-900 font-semibold"
              dangerouslySetInnerHTML={{ __html: complaint.description }}
            />
            <h3 className="text-xl text-gray-600 font-medium mt-2">Location:</h3>
            <p
              className="text-lg text-gray-900 font-semibold"
              dangerouslySetInnerHTML={{ __html: complaint.location }}
            />
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
