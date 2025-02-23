// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/notes`, { content });
      setContent('');
      fetchNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your note"
          required
        />
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-list">
        {notes.map(note => (
          <div key={note._id} className="note">
            <p>{note.content}</p>
            <small>{new Date(note.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
