import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Router } from './router';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './contexts/UserContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Router />
      </GoogleOAuthProvider>
    </UserProvider>
  </StrictMode>
);
