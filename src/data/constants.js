export const DEFAULT_LABELS = [
  {
    id: 1,
    title: "Todo",
    color: "red",
    description: "Work to be done",
  },
  {
    id: 2,
    title: "In Progress",
    color: "yellow",
    description: "Work in progress",
  },
  {
    id: 3,
    title: "Completed",
    color: "green",
    description: "Work completed",
  },
  {
    id: 4,
    title: "Backlog",
    color: "gray",
    description: "Work not yet started",
  },
  {
    id: 5,
    title: "On Hold",
    color: "purple",
    description: "Work on hold",
  },
];

export const DEFAULT_TAGS = [
  {
    title: "bug",
    description: "there is bug in code",
    color: "red",
  },
  {
    title: "feature",
    description: "new feature required",
    color: "purple",
  },
  {
    title: "research",
    description: "research purpose",
    color: "yellow",
  },
];

export const LABELS_COLOR = {
  red: "border-red-500 bg-red-100 text-red-500",
  yellow: "border-yellow-500 bg-yellow-100 text-yellow-500",
  green: "border-green-500 bg-green-100 text-green-500",
  gray: "border-gray-500 bg-gray-100 text-gray-500",
  purple: "border-purple-500 bg-purple-100 text-purple-500",
  blue: "border-blue-500 bg-blue-100 text-blue-500",
  orange: "border-orange-500 bg-orange-100 text-orange-500",
  pink: "border-pink-500 bg-pink-100 text-pink-500",
};

export const COLOR_TO_HEX = {
  red: "#ef4444",
  yellow: "#facc15",
  green: "#10b981",
  blue: "#3b82f6",
  gray: "#6b7280",
  purple: "#a855f7",
  orange: "#f59e0b",
  pink: "#ec4899",
};

export const LIMIT = {
  TASK_TITLE: 100,
  TASK_DESCRIPTION: 200,

  LABLE_TITLE: 20,
  LABLE_DESCRIPTION: 50,
};

export const APP_NAME = "Project Sync";
