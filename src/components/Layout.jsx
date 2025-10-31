// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <main>
        {/* The Outlet component will render the current page (e.g., Login, Signup) */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;