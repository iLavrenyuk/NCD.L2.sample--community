import React from 'react';
import { routes } from './routes';
import { HomePage } from '../pages/HomePage';
import { Dashboard } from '../pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './roles/RequireAuth';

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.Home} element={<HomePage />} />
      <Route
        path={routes.Dashboard}
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>
  );
};
