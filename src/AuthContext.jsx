// src/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabaseClient';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for an existing session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth state changes (login, logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup the subscription when the component unmounts
    return () => subscription.unsubscribe();
  }, []);

  const value = {
    session,
    user: session?.user, // Expose the user object directly
  };

  // We don't render the app until we've checked for a session
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Create a custom hook to easily use the context
export function useAuth() {
  return useContext(AuthContext);
}