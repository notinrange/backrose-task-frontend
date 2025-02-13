// src/components/CSVEditor.tsx
import React, { useState, useEffect } from "react";
import api from "../utils/api.ts";
// import { CSVRecord } from "../models"; // Optional: if you create a separate TS model file for CSV; otherwise, inline types.

interface CSVRecordType {
  user: string;
  broker: string;
  "API key": string;
  "API secret": string;
  pnl: string;
  margin: string;
  max_risk: string;
}

const CSVEditor: React.FC = () => {
  const [records, setRecords] = useState<CSVRecordType[]>([]);
  const [newRecord, setNewRecord] = useState<CSVRecordType>({
    user: "",
    broker: "",
    "API key": "",
    "API secret": "",
    pnl: "0",
    margin: "0",
    max_risk: "0",
  });
  const [editUser, setEditUser] = useState<string>("");
  const [editRecord, setEditRecord] = useState<Partial<CSVRecordType>>({});
  const [error, setError] = useState<string>("");

  const fetchCSV = async () => {
    try {
      const response = await api.get("/csv");
      setRecords(response.data);
      setError("");
    } catch (err: any) {
      setError("Error fetching CSV data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCSV();
  }, []);

  const handleAdd = async () => {
    try {
      await api.post("/csv", newRecord);
      setNewRecord({
        user: "",
        broker: "",
        "API key": "",
        "API secret": "",
        pnl: "0",
        margin: "0",
        max_risk: "0",
      });
      fetchCSV();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error adding record.");
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put("/csv", { ...editRecord, user: editUser });
      setEditUser("");
      setEditRecord({});
      fetchCSV();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error updating record.");
    }
  };

  const handleDelete = async (user: string) => {
    try {
      await api.delete(`/csv`, { params: { user } });
      fetchCSV();
    } catch (err: any) {
      setError(err.response?.data?.detail || "Error deleting record.");
    }
  };

  return (
    <div>
      <h4>Add Record</h4>
      <div style={styles.form}>
        {(["user", "broker", "API key", "API secret", "pnl", "margin", "max_risk"] as const).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={newRecord[field]}
            onChange={(e) =>
              setNewRecord({ ...newRecord, [field]: e.target.value })
            }
            style={styles.input}
          />
        ))}
        <button onClick={handleAdd} style={styles.button}>Add</button>
      </div>
      <h4>Existing Records</h4>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            {(["user", "broker", "API key", "API secret", "pnl", "margin", "max_risk"] as const).map((header) => (
              <th key={header} style={styles.th}>{header}</th>
            ))}
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.user}>
              {(["user", "broker", "API key", "API secret", "pnl", "margin", "max_risk"] as const).map((field) => (
                <td key={field} style={styles.td}>{rec[field]}</td>
              ))}
              <td style={styles.td}>
                <button onClick={() => {
                  setEditUser(rec.user);
                  setEditRecord(rec);
                }} style={styles.button}>Edit</button>
                <button onClick={() => handleDelete(rec.user)} style={{ ...styles.button, marginLeft: "5px" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <div style={styles.editContainer}>
          <h4>Edit Record (User: {editUser})</h4>
          {(["broker", "API key", "API secret", "pnl", "margin", "max_risk"] as const).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              value={editRecord[field] || ""}
              onChange={(e) =>
                setEditRecord({ ...editRecord, [field]: e.target.value })
              }
              style={styles.input}
            />
          ))}
          <button onClick={handleUpdate} style={styles.button}>Update</button>
          <button onClick={() => { setEditUser(""); setEditRecord({}); }} style={{ ...styles.button, marginLeft: "5px" }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #333",
    backgroundColor: "#2e2e2e",
    color: "#fff",
    flex: "1 0 120px",
  },
  button: {
    padding: "8px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#90caf9",
    cursor: "pointer",
    color: "#000",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #333",
    padding: "8px",
    backgroundColor: "#2e2e2e",
    color: "#fff",
  },
  td: {
    border: "1px solid #333",
    padding: "8px",
    color: "#fff",
  },
  editContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#2e2e2e",
    borderRadius: "8px",
  },
};

export default CSVEditor;
