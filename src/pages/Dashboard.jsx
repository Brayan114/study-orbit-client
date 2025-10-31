// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../AuthContext';
import './Dashboard.css';
import FileUploadModal from '../components/FileUploadModal';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the username from the 'profiles' table when the component loads
  useEffect(() => {
    async function getProfile() {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
        }
      }
    }
    getProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleAddNew = () => {
    setIsModalOpen(true); // This now opens the modal
  };

  return (
    <><div className="dashboard-container">
      {/* New Header */}
      <header className="dashboard-header">
        <div className="welcome-message">
          <h2>Welcome back, {username || '...'}!</h2>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Log Out
        </button>
      </header>

      <main className="content-area">
        <section className="document-section">
          <h3 className="section-title">Recent Documents</h3>
          <div className="document-grid">
            <div className="add-new-card" onClick={handleAddNew}>
              <div className="add-icon">➕</div>
              <p>Create new</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} /></>
    
  );
}

export default Dashboard;