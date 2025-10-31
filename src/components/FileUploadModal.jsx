// src/components/FileUploadModal.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../AuthContext';
import './FileUploadModal.css';

function FileUploadModal({ isOpen, onClose }) {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Handles when a user selects a file from the "Browse" button
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage(''); // Clear previous messages
  };

  // The main function that runs when the form is submitted
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }
    if (!user) {
      setMessage('You must be logged in to upload a file.');
      return;
    }

    setUploading(true);
    setMessage('Uploading file to secure storage...');

    try {
      // Create a unique file path for the user's file.
      // e.g., 'user_id/1678886400000_document.pdf'
      const filePath = `${user.id}/${Date.now()}_${selectedFile.name}`;

      // --- THE CORE UPLOAD LOGIC ---
      // 'documents' is the bucket name we created earlier.
      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError; // If the upload fails, stop here.
      }

      // --- UPLOAD SUCCESSFUL ---
      setMessage('✅ File uploaded successfully! We will notify the backend.');
      
      // TODO: Here is where we will notify our Node.js server.
      // For now, we'll simulate it.
      console.log('File available at path:', data.path);

      // Close the modal and reset the state after a short delay
      setTimeout(() => {
        setSelectedFile(null);
        onClose(); 
      }, 2000);

    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  // If the modal isn't open, render nothing.
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h2>Upload New Document</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </header>
        <main className="modal-body">
          <p>Select a file (.pdf, .txt, .docx) to begin processing.</p>
          <form onSubmit={handleFormSubmit}>
            <div className="file-drop-area">
              <input 
                type="file" 
                id="file-upload" 
                hidden 
                onChange={handleFileChange}
                disabled={uploading}
              />
              <label htmlFor="file-upload" className="file-upload-label">
                Browse Files
              </label>
              {selectedFile && <p>Selected: {selectedFile.name}</p>}
            </div>
            {message && <p className="upload-message">{message}</p>}
            <button type="submit" className="upload-btn" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload & Process'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default FileUploadModal;