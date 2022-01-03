import React from 'react';
import { routes } from './routes';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './roles/RequireAuth';

export const Router = () => {
  return (
    <Routes>
      <Route path={routes.Home} element={<div>Home Page</div>} />
      <Route
        path={routes.Dashboard}
        element={
          <RequireAuth>
            <div>Dashboard Page</div>
          </RequireAuth>
        }
      />
    </Routes>
  );
};
