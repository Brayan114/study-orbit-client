// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './AuthContext'; // 1. Import the provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* 2. Wrap the App */}
      <App />
    </AuthProvider>
  </StrictMode>
);