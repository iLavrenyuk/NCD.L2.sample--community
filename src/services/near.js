import BN from 'bn.js';
import { keyStores, Near, WalletConnection, Contract } from 'near-api-js';

const gas = new BN('70000000000000');
const getContractID = () => localStorage.getItem('CONTRACT_ID');

export const config = new Near({
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
});

export const wallet = () => new WalletConnection(config, getContractID());

export const signIn = (successUrl) => {
  return wallet().requestSignIn({ contractId: getContractID(), successUrl });
};

export const signOut = () => {
  return wallet().signOut(getContractID());
};

// use new Contract for improve wallet.account().functionCall()
export const contract = () =>
  new Contract(wallet().account(), getContractID(), {
    viewMethods: ['getComplaints', 'hasAlreadyVoted'],
    changeMethods: ['addNewComplaint', 'voteComplaint', 'removeVote'],
    sender: wallet().account(),
  });

export const getComplaints = () => {
  return contract().getComplaints();
};

export const alreadyVoted = (userId) => {
  return contract().hasAlreadyVoted({ accountId: userId });
};

//function to add new complaint
export const addNewComplaint = ({ title, description, category, location }) => {
  return contract().addNewComplaint({ title, description, category, location }, gas);
};

//function to vote
export const voteComplaint = (id) => {
  return contract().voteComplaint({ id });
};

//function to remove vote
export const removeVote = (id) => {
  return contract().removeVote({ id });
};

// export const takeComplaint = ({id}) => {
//   console.log(id)
//   return wallet.account().functionCall({
//       contractId: getContractID(),
//       methodName: "takeComplaint",
//       gas,
//       args: {id}
//   })
// }

// export const finishComplaint = ({id}) => {
//   console.log(id)
//   return wallet.account().functionCall({
//       contractId: getContractID(),
//       methodName: "finishComplaint",
//       gas,
//       args: {id}
//   })
// }
