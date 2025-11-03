import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const InstanceChart = ({ stats }) => {
  // Transform stats data for chart
  // const statsArray = Array.isArray(stats)
  //   ? stats
  //   : Object.entries(stats).map(([key, value]) => ({
  //       instance_state: key,
  //       count: value,
  //     }));
  const chartData = stats.reduce((acc, stat) => {
    const existing = acc.find((item) => item.state === stat.instance_state);
    if (existing) {
      existing.count += parseInt(stat.count);
    } else {
      acc.push({
        state: stat.instance_state,
        count: parseInt(stat.count),
      });
    }
    return acc;
  }, []);

  const getColorByState = (state) => {
    const colors = {
      running: "#28a745",
      stopped: "#dc3545",
      pending: "#ffc107",
      terminated: "#6c757d",
    };
    return colors[state] || "#007bff";
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Instance Distribution by State</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="state" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#007bff"
            name="Instance Count"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div style={styles.statsGrid}>
        {chartData.map((stat) => (
          <div
            key={stat.state}
            style={{
              ...styles.statCard,
              borderLeft: `4px solid ${getColorByState(stat.state)}`,
            }}
          >
            <div style={styles.statValue}>{stat.count}</div>
            <div style={styles.statLabel}>{stat.state}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },
  statCard: {
    padding: "15px",
    backgroundColor: "#f8f9fa",
    borderRadius: "4px",
  },
  statValue: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: "14px",
    color: "#666",
    textTransform: "capitalize",
  },
};

export default InstanceChart;
