"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Overview() {
  const tasks = [
    {
      id: "1",
      title: "Task 1",
      label: "backlog",
      createdAt: "2025-06-01T00:00:00Z",
    },
    {
      id: "2",
      title: "Task 2",
      label: "in-progress",
      createdAt: "2025-06-01T00:15:00Z",
    },
    {
      id: "3",
      title: "Task 3",
      label: "done",
      createdAt: "2025-06-01T00:30:00Z",
    },
    {
      id: "4",
      title: "Task 4",
      label: "todo",
      createdAt: "2025-06-01T00:45:00Z",
    },
    {
      id: "5",
      title: "Task 5",
      label: "done",
      createdAt: "2025-06-01T01:00:00Z",
    },
    {
      id: "6",
      title: "Task 6",
      label: "todo",
      createdAt: "2025-06-01T01:15:00Z",
    },
    {
      id: "7",
      title: "Task 7",
      label: "in-progress",
      createdAt: "2025-06-01T01:15:00Z",
    },
    {
      id: "8",
      title: "Task 8",
      label: "in-progress",
      createdAt: "2025-06-01T01:30:00Z",
    },
    {
      id: "9",
      title: "Task 9",
      label: "done",
      createdAt: "2025-06-01T01:45:00Z",
    },
    {
      id: "10",
      title: "Task 10",
      label: "done",
      createdAt: "2025-06-01T02:00:00Z",
    },
    {
      id: "11",
      title: "Task 11",
      label: "todo",
      createdAt: "2025-06-01T02:00:00Z",
    },
    {
      id: "12",
      title: "Task 12",
      label: "todo",
      createdAt: "2025-06-01T02:15:00Z",
    },
    {
      id: "13",
      title: "Task 13",
      label: "in-progress",
      createdAt: "2025-06-01T02:30:00Z",
    },
    {
      id: "14",
      title: "Task 14",
      label: "todo",
      createdAt: "2025-06-01T02:45:00Z",
    },
    {
      id: "15",
      title: "Task 15",
      label: "in-progress",
      createdAt: "2025-06-01T03:00:00Z",
    },
    {
      id: "16",
      title: "Task 16",
      label: "done",
      createdAt: "2025-06-01T03:15:00Z",
    },
    {
      id: "17",
      title: "Task 17",
      label: "in-progress",
      createdAt: "2025-06-01T03:30:00Z",
    },
    {
      id: "18",
      title: "Task 18",
      label: "todo",
      createdAt: "2025-06-01T03:30:00Z",
    },
    {
      id: "19",
      title: "Task 19",
      label: "done",
      createdAt: "2025-06-01T03:45:00Z",
    },
    {
      id: "20",
      title: "Task 20",
      label: "done",
      createdAt: "2025-06-01T04:00:00Z",
    },
    {
      id: "21",
      title: "Task 21",
      label: "backlog",
      createdAt: "2025-06-01T04:15:00Z",
    },
    {
      id: "22",
      title: "Task 22",
      label: "backlog",
      createdAt: "2025-06-01T04:30:00Z",
    },
    {
      id: "23",
      title: "Task 23",
      label: "in-progress",
      createdAt: "2025-06-01T04:30:00Z",
    },
    {
      id: "24",
      title: "Task 24",
      label: "in-progress",
      createdAt: "2025-06-01T04:45:00Z",
    },
    {
      id: "25",
      title: "Task 25",
      label: "done",
      createdAt: "2025-06-01T05:00:00Z",
    },
  ];

  // Extract unique label types
  const labelTypes = [...new Set(tasks.map((task) => task.label))];

  // Assign colors for each label type
  const labelColors = {
    todo: "#facc15", // yellow
    "in-progress": "#3b82f6", // blue
    done: "#10b981", // green
    review: "#a855f7", // purple
    blocked: "#ef4444", // red
    backlog: "#6b7280", // gray
  };

  const getColor = (label) => labelColors[label] || "#6b7280"; // default gray

  // Group tasks by time and label counts
  const trendByLabel = tasks.reduce((acc, task) => {
    const time = new Date(task.createdAt).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      hour12: true,
    });

    if (!acc[time]) {
      acc[time] = { time };
      labelTypes.forEach((label) => (acc[time][label] = 0));
    }

    acc[time][task.label] += 1;

    return acc;
  }, {});

  const trendData = Object.values(trendByLabel);

  return (
    <div className="h-full flex flex-col gap-2">
      <section className="dark:bg-[#131416] p-4 rounded-lg">
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {labelTypes.map((label) => (
                <linearGradient
                  key={label}
                  id={`color-${label}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={getColor(label)}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={getColor(label)}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>

            <XAxis dataKey="time" />
            <YAxis />
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <Tooltip />

            {labelTypes.map((label) => (
              <Area
                key={label}
                type="monotone"
                dataKey={label}
                stroke={getColor(label)}
                fill={`url(#color-${label})`}
                stackId="1"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </section>

      <section className="dark:bg-[#131416] bg-white p-6 rounded-xl shadow-md flex justify-center items-center">
        <div className="w-fit p-6 border border-slate-300 rounded-xl flex flex-col gap-4 justify-center items-center hover:shadow-lg transition-shadow duration-300">
          <div className="border-[6px] size-24 flex justify-center items-center border-yellow-400 rounded-full p-4 bg-yellow-100 dark:bg-yellow-200/10">
            <span className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">
              4
            </span>
          </div>

          <span className="text-lg font-medium tracking-wide text-yellow-700 dark:text-yellow-200">
            TODO
          </span>
        </div>
      </section>
    </div>
  );
}
