import React from "react";
import { useInstances } from "../hooks/useInstances";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import InstanceTable from "./InstanceTable";
import InstanceChart from "./InstanceChart";
import Pagination from "./Pagination";

const Dashboard = () => {
  const {
    instances,
    stats,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    changeLimit,
    syncInstances,
  } = useInstances();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>EC2 Inventory Admin Dashboard</h1>
        <button
          onClick={syncInstances}
          style={styles.syncButton}
          disabled={loading}
        >
          {loading ? "Syncing..." : "Sync from AWS"}
        </button>
      </header>

      {error && <div style={styles.error}>{error}</div>}

      <InstanceChart stats={stats} />

      <div style={styles.controls}>
        <SearchBar onSearch={(search) => updateFilters({ search })} />
        <FilterPanel filters={filters} onFilterChange={updateFilters} />
      </div>

      {loading ? (
        <div style={styles.loading}>Loading instances...</div>
      ) : (
        <>
          <InstanceTable instances={instances} />
          <Pagination
            pagination={pagination}
            onPageChange={changePage}
            onLimitChange={changeLimit}
          />
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
  syncButton: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  controls: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  error: {
    padding: "15px",
    backgroundColor: "#f8d7da",
    color: "#721c24",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  loading: {
    padding: "40px",
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
};

export default Dashboard;
