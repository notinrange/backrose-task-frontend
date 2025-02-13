// src/components/Recovery.jsx
import React, { useState } from 'react';
import api from '../utils/api';

const Recovery = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRestore = async () => {
    try {
      const response = await api.post('/csv/restore');
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError('Error restoring backup.');
      setMessage('');
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={handleRestore} style={styles.button}>Restore Backup</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

const styles = {
  button: {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#90caf9',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Recovery;
