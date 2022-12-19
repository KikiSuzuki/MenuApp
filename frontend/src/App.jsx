import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './styles/tachyons.min.css';
import './styles/app.css';
import AppLayoutA from './core/AppLayoutAdmin';
import AppLayoutU from './core/AppLayoutUser';
import { Loader } from './shared/components';
import { userSelectors } from './store/user';

// Views
const Login = lazy(() => import('./modules/Login'));
const Logout = lazy(() => import('./core/Logout'));
const Users = lazy(() => import('./modules/Users'));
const SessionLogs = lazy(() => import('./modules/SessionLogs'));
const DesktopA = lazy(() => import('./modules/DesktopAdmin'));
const DesktopU = lazy(() => import('./modules/DesktopUser'));
const RestaurantsA = lazy(() => import('./modules/RestaurantsAdmin'));
const RestaurantsU = lazy(() => import('./modules/RestaurantsUser'));

export default function App() {
  const isLogged = useSelector(userSelectors.selectIsLogged);
  const isAdmin = useSelector(userSelectors.selectIsAdmin);
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
            {(isLogged && isAdmin) && (
                <Route path="/" element={<AppLayoutA />}>
                  <Route path="desktop" element={<DesktopA />} />
                  <Route path="users" element={<Users />} />
                  <Route path="session-logs" element={<SessionLogs />} />
                  <Route path="restaurants" element={<RestaurantsA />}/>
                </Route>
              )}
            {(isLogged && !isAdmin)&&(
              <Route path="/" element={<AppLayoutU />}>
                <Route path="desktop" element={<DesktopU />} />
                <Route path="restaurants" element={<RestaurantsU />}/>
              </Route>
            )}
          </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
