// src/components/DataTable.tsx
import React, { useEffect, useState } from 'react';
import api from '../utils/api';

interface NumberRecord {
  id: number;
  timestamp: string;
  value: number;
}

const DataTable: React.FC = () => {
  const [numbers, setNumbers] = useState<NumberRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // Records per page

  const fetchNumbers = async () => {
    try {
      const response = await api.get('/numbers');
      setNumbers(response.data);
      setError(null);
    } catch (err: any) {
      setError("Error fetching numbers.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNumbers();
    const interval = setInterval(fetchNumbers, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate total pages and slice data for current page
  const totalPages = Math.ceil(numbers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const displayedRecords = numbers.slice(startIndex, startIndex + pageSize);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Timestamp</th>
            <th style={styles.th}>Value</th>
          </tr>
        </thead>
        <tbody>
          {displayedRecords.map((num) => (
            <tr key={num.id}>
              <td style={styles.td}>{num.id}</td>
              <td style={styles.td}>{new Date(num.timestamp).toLocaleString()}</td>
              <td style={styles.td}>{num.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1} style={styles.pageButton}>
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages || totalPages === 0} style={styles.pageButton}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
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
  pagination: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
  pageButton: {
    padding: "5px 10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#90caf9",
    cursor: "pointer",
    color: "#000",
  },
  pageInfo: {
    color: "#fff",
  },
};

export default DataTable;
