import './index.css';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { Login } from './pages/Login.tsx';
import { Timeline } from './pages/Timeline.tsx';
import { routeDef } from './utils/routes.tsx';
import { Settings } from './pages/Settings.tsx';

function PrivateRoute() {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to={routeDef.login.url} replace />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={routeDef.login.url} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={routeDef.timeline.url} element={<Timeline />} />
          <Route path={routeDef.settings.url} element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
