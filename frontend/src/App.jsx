import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import './styles/tachyons.min.css';
import './styles/app.css';
import AppLayout from './core/AppLayout';
import { Loader } from './shared/components';
import { userSelectors } from './store/user';

// Views
const Login = lazy(() => import('./modules/Login'));
const Logout = lazy(() => import('./core/Logout'));
const Users = lazy(() => import('./modules/Users'));
const SessionLogs = lazy(() => import('./modules/SessionLogs'));
const Desktop = lazy(() => import('./modules/Desktop'));

export default function App() {
  const isLogged = useSelector(userSelectors.selectIsLogged);

  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/desktop" element={<Desktop />} />
          <Route path="/users" element={<Users />} />
          <Route path="/session-logs" element={<SessionLogs />} />
          </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
