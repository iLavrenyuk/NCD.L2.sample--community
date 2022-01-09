import React from 'react';
import { routes } from './routes';
import { HomePage } from '../pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './roles/RequireAuth';
import { CompliantList } from '../pages/dashboard/CompliantList';
import { CreateCompliant } from '../pages/dashboard/CreateCompliant';
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper';

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.Home} element={<HomePage />} />
      <Route
        path={routes.Dashboard}
        element={
          <RequireAuth>
            <DashboardWrapper />
          </RequireAuth>
        }
      >
        <Route path={routes.Dashboard} element={<CompliantList />} />
        <Route path={routes.CreateCompliant} element={<CreateCompliant />} />
      </Route>
    </Routes>
  );
};
