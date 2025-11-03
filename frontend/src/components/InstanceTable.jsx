import React from "react";

const InstanceTable = ({ instances }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString();
  };

  const getStateColor = (state) => {
    const colors = {
      running: "#28a745",
      stopped: "#dc3545",
      pending: "#ffc107",
      terminated: "#6c757d",
    };
    return colors[state] || "#007bff";
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.th}>Instance ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>State</th>
            <th style={styles.th}>Region</th>
            <th style={styles.th}>Public IP</th>
            <th style={styles.th}>Private IP</th>
            <th style={styles.th}>Launch Time</th>
          </tr>
        </thead>
        <tbody>
          {instances.length === 0 ? (
            <tr>
              <td colSpan="8" style={styles.noData}>
                No instances found
              </td>
            </tr>
          ) : (
            instances.map((instance) => (
              <tr key={instance.instance_id} style={styles.row}>
                <td style={styles.td}>{instance.instance_id}</td>
                <td style={styles.td}>{instance.instance_name || "N/A"}</td>
                <td style={styles.td}>{instance.instance_type}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: getStateColor(instance.instance_state),
                    }}
                  >
                    {instance.instance_state}
                  </span>
                </td>
                <td style={styles.td}>{instance.region}</td>
                <td style={styles.td}>{instance.public_ip_address || "N/A"}</td>
                <td style={styles.td}>
                  {instance.private_ip_address || "N/A"}
                </td>
                <td style={styles.td}>{formatDate(instance.launch_time)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableContainer: {
    overflowX: "auto",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  },
  headerRow: {
    backgroundColor: "#f8f9fa",
  },
  th: {
    padding: "12px",
    textAlign: "left",
    fontWeight: "bold",
    color: "#333",
    borderBottom: "2px solid #dee2e6",
  },
  row: {
    borderBottom: "1px solid #dee2e6",
  },
  td: {
    padding: "12px",
    color: "#555",
  },
  badge: {
    padding: "4px 8px",
    borderRadius: "4px",
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  noData: {
    padding: "20px",
    textAlign: "center",
    color: "#999",
  },
};

export default InstanceTable;
