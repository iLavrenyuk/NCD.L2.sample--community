import React, { createContext, useContext, useState } from 'react';
import { wallet } from '../services/near';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;
  const contractId = localStorage.getItem('CONTRACT_ID');
  !contractId && localStorage.setItem('CONTRACT_ID', defaultContractId);

  const [contractData, setContractData] = useState(contractId ?? defaultContractId);
  const [accountId, setAccountId] = useState(wallet.getAccountId());
  const [apiError, setApiError] = useState();

  const setContractId = (contractId) => {
    localStorage.setItem('CONTRACT_ID', contractId);
    setContractData(contractId);
  };

  const store = { contractId: contractData, setContractId, accountId, setAccountId, apiError, setApiError };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);
