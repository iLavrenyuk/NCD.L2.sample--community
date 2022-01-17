import BN from 'bn.js';
import { keyStores, Near, WalletConnection } from 'near-api-js';

const gas = new BN('70000000000000');

export const near = new Near({
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
});

export const wallet = new WalletConnection(near, 'communite');

export const signIn = (successUrl) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.requestSignIn({ contractId: CONTRACT_ID, successUrl });
};

export const signOut = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.signOut(CONTRACT_ID);
};

export const getComplaints = () => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'getComplaints');
};

export const alreadyVoted = (userId) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().viewFunction(CONTRACT_ID, 'hasAlreadyVoted', { accountId: userId });
};

//function to add new complaint
export const addNewComplaint = ({ title, description, category, location }) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'addNewComplaint',
    gas,
    args: { title, description, category, location },
  });
};

//function to vote
export const voteComplaint = (id) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'voteComplaint',
    args: { id: id },
  });
};

//function to remove vote
export const removeVote = (id) => {
  const CONTRACT_ID = localStorage.getItem('CONTRACT_ID');
  return wallet.account().functionCall({
    contractId: CONTRACT_ID,
    methodName: 'removeVote',
    args: { id: id },
  });
};

// export const takeComplaint = ({id}) => {
//   console.log(id)
//   return wallet.account().functionCall({
//       contractId: CONTRACT_ID,
//       methodName: "takeComplaint",
//       gas,
//       args: {id}
//   })
// }

// export const finishComplaint = ({id}) => {
//   console.log(id)
//   return wallet.account().functionCall({
//       contractId: CONTRACT_ID,
//       methodName: "finishComplaint",
//       gas,
//       args: {id}
//   })
// }
