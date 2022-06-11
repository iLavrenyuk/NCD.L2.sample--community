#  🎓 NCD.L2.sample--thanks dapp
This repository contains a complete frontend applications (React) to work with 
<a href="https://github.com/Learn-NEAR/NCD.L1.sample--Communite" target="_blank">NCD.L1.sample--community smart contract</a> targeting the NEAR platform:
1. React (master branch)

The goal of this repository is to make it as easy as possible to get started writing frontend with React for AssemblyScript contracts built to work with NEAR Protocol.

## DEMO:
<a href="https://near-community-react.onrender.com" target="_blank">Open demo</a>

## ⚠️ Warning
Any content produced by NEAR, or developer resources that NEAR provides, are for educational and inspiration purposes only. NEAR does not encourage, induce or sanction the deployment of any such applications in violation of applicable laws or regulations.

![image](https://user-images.githubusercontent.com/48129985/173178780-bb9ae56b-74ae-42a2-8ae4-b94c72aa9f88.png)

## ⚡  Usage
I recorded a short video in Loom, where I review "what is do" this project
<a href="https://www.loom.com/share/8e746e6522d9408dbc810bf3e8f88848" target="_blank">UI walkthrough</a>


To deploy sample--community to your account visit <a href="https://github.com/Learn-NEAR/NCD.L1.sample--Communite" target="_blank">this repo (smart contract deployment instructions are inside):</a> 


After you successfully deployed registry and thanks contracts and you have contract ids, you can input them on a deployed <a href="https://near-community-react.onrender.com" target="_blank">website </a> or you can clone the repo and put contract ids inside .env file :

```
REACT_APP_CONTRACT_ID = "put your smart-contract id here"
```
After you input your values inside .env file, you need to :
1. Install all dependencies 
```
yarn
```
2. Run the project locally
```
yarn start
```
Other commands:

Compiles and minifies for production
```
yarn build
```
Lints and fixes files
```
yarn lint
```

## 👀 Code walkthrough for Near university students

I recorded a short video in Loom, where I review the code
<a href="https://www.loom.com/share/491d800ba7f1420b9a7d756025b560cd" target="_blank">Code walkthrough video</a>

We are using ```near-api-js``` to work with NEAR blockchain. In ``` /services/near.js ``` we are importing classes, functions and configs which we are going to use:
```
import { keyStores, Near, Contract, WalletConnection, utils } from "near-api-js";
```
Then we are connecting to NEAR:
```
// create config for connecting to NEAR
export const config = new Near({
  networkId: 'testnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: 'https://wallet.testnet.near.org',
});
```
and creating wallet connection
```
const getContractID = () => localStorage.getItem('CONTRACT_ID');
const wallet = () => new WalletConnection(config, getContractID()));
```
After this by using API we can use ```wallet``` and call ```signIn()``` and ```signOut()``` functions of wallet object. By doing this, login functionality can now be used in any component. 

And also we in return statement we are returning wallet object, we are doing this to call ``` wallet.getAccountId()``` to show accountId in ``` /components/Dashboard.jsx ```

```wallet``` code :
```
export const signIn = (successUrl) => {
  return wallet().requestSignIn({ contractId: getContractID(), successUrl });
};

export const signOut = () => {
  return wallet().signOut(getContractID());
};
```

To work with smart thanks and registry smart contracts we are loading the contracts inside  ``` /services/near.js:```
```
export const contract = () =>
  new Contract(wallet().account(), getContractID(), {
    viewMethods: ['retrieveMessages'],
    changeMethods: ['deleteAllMessages', 'sendMessage'],
    sender: wallet().account(),
  });
```

and we are creating function to export for each contract function

example of a call with no params: 
```
//function to get all Complaints
export const getComplaints = () => {
  return contract().getComplaints();
};
```

example of call with params 
```
//function to add new complaint
export const addNewComplaint = ({ title, description, category, location }) => {
  return contract().addNewComplaint({ title, description, category, location }, gas);
};
```

Then in ```store/index.jsx``` we are just state all global data and functions from ```services/near.js```:
For example in Header component
```
import { useStore } from '../../store';

export const Header = () => {
  const { accountId } = useStore();
```

and using it to store some state of contracts and to call contracts functions: 
```
import React, { createContext, useContext, useState } from 'react';
import { wallet } from '../services/near';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;
  const contractId = localStorage.getItem('CONTRACT_ID');
  !contractId && localStorage.setItem('CONTRACT_ID', defaultContractId);

  const [contractData, setContractData] = useState(contractId ?? defaultContractId);
  const [accountId, setAccountId] = useState(wallet().getAccountId());
  const [searchInput, setSearchInput] = useState('');
  const [apiError, setApiError] = useState();

  const setContractId = (contractId) => {
    localStorage.setItem('CONTRACT_ID', contractId);
    setContractData(contractId);
  };

  const store = {
    contractId: contractData,
    setContractId,
    accountId,
    setAccountId,
    apiError,
    setApiError,
    searchInput,
    setSearchInput,
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
```

Inside ```/src/pages/CompliantList.jsx``` we have lifecycle hook ``` useEffect() ``` where we are getting all the data from the smart contract
```
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
```

And inside components we are using API request from ```services/near.js``` as an example :
```
const onSubmit = async (data) => {
  try {
    const args = { ...data, category: parseInt(data.category) };
    await addNewComplaint(args);
  } catch (error) {
    console.log(error);
  }
};
```
