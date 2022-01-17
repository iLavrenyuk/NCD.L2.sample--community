import React, { useState } from 'react';
import { useStore } from '../../store';
import { ReactComponent as CrossSvg } from '../../assets/svg/cross.svg';
import { ReactComponent as NearLogoSvg } from '../../assets/svg/nearLogo.svg';
import { ReactComponent as NearNameSvg } from '../../assets/svg/nearName.svg';

export const ChangeContract = () => {
  const { contractId, setContractId, apiError, setApiError } = useStore();
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;

  const [isOpen, setIsOpen] = useState();
  const [inputContract, setInputContract] = useState('');

  const handleChange = (e) => {
    setInputContract(e.target.value);
    setApiError(false);
  };

  const setDefaultContractId = () => {
    localStorage.setItem('CONTRACT_ID', defaultContractId);
    setContractId(defaultContractId);
  };

  return !isOpen ? (
    <div className="fixed z-50 bottom-16 right-60">
      <button
        onClick={() => setIsOpen(true)}
        className="w-64 h-64 box-border border-8 pulsing-border flex items-center justify-center rounded-full bg-purple-500 border-purple-400 hover:bg-pink-500 hover:border-pink-400"
      >
        <NearLogoSvg />
      </button>
    </div>
  ) : (
    <div className="fixed top-0 left-0 z-40 w-full h-screen flex items-center justify-center">
      <div className="absolute w-full h-screen bg-gray-400 opacity-50 z-40" />
      <div className="relative z-50 w-376 bg-white rounded-xl flex flex-col items-center px-5 py-8">
        <button onClick={() => setIsOpen(false)} className="absolute right-4 top-4 text-black hover:text-purple-500">
          <CrossSvg />
        </button>

        <NearNameSvg />

        <p className="mt-4 text-black text-2xl font-bold">Contract deploy</p>

        <p className="text-xs md:text-sm text-gray-500 text-center mt-1 font-bold">
          Please make sure that you put in input field correct contract id and your contract is deployed correctly. This
          is{' '}
          <a
            href="https://github.com/iLavrenyuk/NEAR-community"
            target="_blank"
            rel="noreferrer"
            className="text-purple-500 hover:text-purple-400"
          >
            contract source code
          </a>{' '}
          with setup instructions. <br />
          <span className="text-black mt-1">
            If your input is not valid, your will see error message with description of error
          </span>
        </p>

        <div className="text-xs md:text-sm font-bold mt-6 text-center">
          <p className="text-purple-500">Current ID:</p>
          <p className="text-black">{contractId}</p>
        </div>

        <div className="w-full mt-8">
          <div className="flex items-center justify-between px-4">
            <p className="text-sm font-semibold">Set your current ID</p>
            {apiError ? <p className="text-xs font-semibold text-red-500">Occured erorr</p> : null}
          </div>
          <input
            onChange={handleChange}
            value={inputContract}
            type="text"
            className={`mt-2 pl-6 h-50 w-full rounded-2xl border bg-white input-shadow outline-none text-sm font-semibold placeholder-gray-400
              ${apiError ? 'border-red-500 focus:border-red-500' : 'border-white focus:border-purple-500'}`}
            placeholder="Set your contract ID"
          />

          {inputContract && inputContract !== contractId ? (
            <button
              onClick={() => setContractId(inputContract)}
              className="mt-8 w-full h-64 rounded-full bg-purple-500 hover:bg-pink-500 text-lg font-bold text-white transform active:scale-95 duration-100"
            >
              Deploy contract
            </button>
          ) : (
            <button
              disabled
              className="mt-8 w-full h-64 rounded-full bg-pink-500 hover:bg-pink-500 text-lg font-bold text-white opacity-50 cursor-not-allowed"
            >
              Deploy contract
            </button>
          )}

          <button
            onClick={setDefaultContractId}
            className="mt-8 w-full h-64 rounded-full border border-red-500 bg-white hover:bg-red-500 text-lg font-bold text-red-500 hover:text-white transform active:scale-95 duration-100"
          >
            Reset to default
          </button>
        </div>
      </div>
    </div>
  );
};
