import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getColor } from "../utility/util";

export default function MyPieChart({ tasks, statuses }) {
  function mapToNameValueColor(status) {
    const filterByStatus = (task) => task.status === status.title;
    return {
      name: status.title,
      value: tasks.filter(filterByStatus).length,
      color: getColor(status),
    };
  }
  const pieData = statuses.map(mapToNameValueColor);

  function mapToCell(entry, index) {
    return <Cell key={`cell-${index}`} fill={entry.color} />;
  }
  return (
    <section className="dark:bg-[#131416] bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Task Distribution (Pie Chart)
      </h2>

      <div className="w-full flex justify-center">
        <ResponsiveContainer width="60%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {pieData.map(mapToCell)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
