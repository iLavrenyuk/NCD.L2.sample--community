import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Features } from '../components/Features';
import { ChangeContract } from '../components/ChangeContract';

export const HomePage = () => {
  return (
    <>
      <ChangeContract />
      <Header />
      <Features />
      <Footer />
    </>
  );
};
