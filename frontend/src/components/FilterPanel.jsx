import React from "react";

const FilterPanel = ({ filters, onFilterChange }) => {
  return (
    <div style={styles.container}>
      <div style={styles.filterGroup}>
        <label style={styles.label}>State:</label>
        <select
          value={filters.state}
          onChange={(e) => onFilterChange({ state: e.target.value })}
          style={styles.select}
        >
          <option value="">All States</option>
          <option value="running">Running</option>
          <option value="stopped">Stopped</option>
          <option value="pending">Pending</option>
          <option value="terminated">Terminated</option>
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Region:</label>
        <select
          value={filters.region}
          onChange={(e) => onFilterChange({ region: e.target.value })}
          style={styles.select}
        >
          <option value="">All Regions</option>
          <option value="us-east-1">US East (N. Virginia)</option>
          <option value="us-west-1">US West (N. California)</option>
          <option value="us-west-2">US West (Oregon)</option>
          <option value="eu-west-1">EU (Ireland)</option>
          <option value="ap-south-1">Asia Pacific (Mumbai)</option>
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Sort By:</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
          style={styles.select}
        >
          <option value="launch_time">Launch Time</option>
          <option value="instance_type">Instance Type</option>
          <option value="instance_state">State</option>
          <option value="region">Region</option>
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.label}>Order:</label>
        <select
          value={filters.sortOrder}
          onChange={(e) => onFilterChange({ sortOrder: e.target.value })}
          style={styles.select}
        >
          <option value="DESC">Descending</option>
          <option value="ASC">Ascending</option>
        </select>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#555",
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
  },
};

export default FilterPanel;
