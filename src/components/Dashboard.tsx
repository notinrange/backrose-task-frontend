// src/components/Dashboard.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';
import { useNavigate } from 'react-router-dom';
import ChartComponent from './ChartComponent.tsx';
import DataTable from './DataTable.tsx';
import CSVEditor from './CSVEditor.tsx';
import Recovery from './Recovery.tsx';
import type { RootState } from '../store';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state: RootState) => state.auth.username);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Dashboard</h2>
        <div>
          <span>Welcome, {username}</span>
          <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        </div>
      </header>
      <div style={styles.content}>
        <div style={styles.section}>
          <h3>Real-Time Chart</h3>
          <ChartComponent />
        </div>
        <div style={styles.section}>
          <h3>Random Numbers Table</h3>
          <DataTable />
        </div>
        <div style={styles.section}>
          <h3>CSV Editor</h3>
          <CSVEditor />
        </div>
        <div style={styles.section}>
          <h3>Restore CSV Backup</h3>
          <Recovery />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutButton: {
    marginLeft: "10px",
    padding: "5px 10px",
    backgroundColor: "#90caf9",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  content: { marginTop: "20px" },
  section: {
    backgroundColor: "#1e1e1e",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    color: "#fff",
  },
};

export default Dashboard;
