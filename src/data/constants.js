export const DEFAULT_STATUSES = [
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

export const DEFAULT_LABELS = [
  {
    id: "label-bug",
    title: "bug",
    description: "Something isn't working",
    color: "#d73a4a", // red
  },
  {
    id: "label-documentation",
    title: "documentation",
    description: "Improvements or additions to documentation",
    color: "#0075ca", // blue
  },
  {
    id: "label-duplicate",
    title: "duplicate",
    description: "This issue or pull request already exists",
    color: "#cfd3d7", // grey
  },
  {
    id: "label-enhancement",
    title: "enhancement",
    description: "New feature or request",
    color: "#a2eeef", // light blue
  },
  {
    id: "label-good-first-issue",
    title: "good first issue",
    description: "Good for newcomers",
    color: "#7057ff", // purple
  },
  {
    id: "label-help-wanted",
    title: "help wanted",
    description: "Extra attention is needed",
    color: "#008672", // green
  },
  {
    id: "label-invalid",
    title: "invalid",
    description: "This doesn't seem right",
    color: "#e4e669", // yellow
  },
  {
    id: "label-question",
    title: "question",
    description: "Further information is requested",
    color: "#d876e3", // pink
  },
  {
    id: "label-wontfix",
    title: "wontfix",
    description: "This will not be worked on",
    color: "#ffffff", // white
  },
];

export const STATUS_COLOR = {
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

  STATUS_TITLE: 20,
  STATUS_DESCRIPTION: 50,
};

export const LOCAL_STORAGE_ITEMS = {
  LABELS: "labels",
  STATUSES: "statuses",
  TASKS: "tasks",
  INIT: "init",
  WORKSPACES: "workspaces",
  MODULES: "modules",
  PAGES: "pages",
};

export const APP_NAME = "Project Sync";

export const DUMMY_WORKSPACE = {
  id: "workspace-1",
  name: "My Workspace",
  description: "This is my workspace",
  modulesIds: ["module-1", "module-2", "module-3"],
};

export const DUMMY_MODULE = {
  id: "module-1",
  name: "Module 1",
  description: "This is module 1",
  pages: ["page-1", "page-2", "page-3"],
  tasks: ["task-1", "task-2", "task-3"],
  team: "team-1",
};

export const DUMMY_PAGE = {
  id: "page-1",
  name: "Page 1",
  description: "This is page 1",
  content: [],
};

export const DUMMY_TASK = {
  id: "task-1",
  title: "Task 1",
  description: "This is task 1",
  status: "todo",
  labels: ["label-1", "label-2"],
  priority: "medium",
  assignees: ["user-1", "user-2"],
};

export const DUMMY_TEAM = {
  id: "team-1",
  name: "Team 1",
  description: "This is team 1",
  members: ["user-1", "user-2", "user-3"],
};
