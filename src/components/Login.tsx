// src/components/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      const token = response.data.token;
      dispatch(setCredentials({ token, username }));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      <p style={styles.linkText}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    margin: '100px auto',
    textAlign: 'center',
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333',
    backgroundColor: '#2e2e2e',
    color: '#fff',
  },
  button: {
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#90caf9',
    cursor: 'pointer',
    color: '#000',
  },
  error: {
    color: 'red',
  },
  linkText: {
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default Login;
