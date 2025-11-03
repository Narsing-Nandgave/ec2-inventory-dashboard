import React from "react";

const Pagination = ({ pagination, onPageChange, onLimitChange }) => {
  const { page, limit, totalRecords, totalPages } = pagination;

  return (
    <div style={styles.container}>
      <div style={styles.info}>
        Showing {Math.min((page - 1) * limit + 1, totalRecords)} to{" "}
        {Math.min(page * limit, totalRecords)} of {totalRecords} records
      </div>

      <div style={styles.controls}>
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1}
          style={styles.button}
        >
          First
        </button>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          style={styles.button}
        >
          Previous
        </button>
        <span style={styles.pageInfo}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          style={styles.button}
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages}
          style={styles.button}
        >
          Last
        </button>
      </div>

      <div style={styles.limitSelector}>
        <label style={styles.label}>Per page:</label>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          style={styles.select}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },
  info: {
    fontSize: "14px",
    color: "#555",
  },
  controls: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
  },
  button: {
    padding: "8px 12px",
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  pageInfo: {
    margin: "0 10px",
    fontSize: "14px",
    fontWeight: "bold",
  },
  limitSelector: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  label: {
    fontSize: "14px",
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
};

export default Pagination;
