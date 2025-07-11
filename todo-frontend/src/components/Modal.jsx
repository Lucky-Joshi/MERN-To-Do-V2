import React, { useState } from 'react';

const Modal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return alert("Title is required");
    onSubmit({ title, priority, description });
    onClose();
    setTimeout(() => alert("✅ Task Added"), 300); // animated feedback
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center',
      alignItems: 'center', zIndex: 1000
    }}>
      <div style={{
        background: 'white', padding: '2rem', borderRadius: '10px',
        minWidth: '300px'
      }}>
        <h2>Add Task</h2>
        <input
          type="text" placeholder="Title"
          value={title} onChange={e => setTitle(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <select
          value={priority} onChange={e => setPriority(e.target.value)}
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
          <option>Lowest</option>
        </select>
        <textarea
          placeholder="Optional description"
          value={description} onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', height: '80px', padding: '0.5rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
