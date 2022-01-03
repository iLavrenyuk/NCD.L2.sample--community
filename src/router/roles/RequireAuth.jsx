import React from 'react';
import { routes } from '../routes';
import { useStore } from '../../store';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }) => {
  const { accountId } = useStore();
  const location = useLocation();

  if (!accountId) {
    return <Navigate to={routes.Home} state={{ from: location }} />;
  }

  return children;
};
