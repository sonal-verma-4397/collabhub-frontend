export const TaskSchema = {
  id: { type: "string", default: () => crypto.randomUUID() },
  title: { type: "string", required: true, default: "" },
  description: { type: "string", default: "" },
  status: {
    type: "string",
    enum: ["todo", "in-progress", "done"],
    default: "todo",
  },
  labels: { type: "array", default: () => [] }, // label IDs
  priority: {
    type: "string",
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  assignees: { type: "array", default: () => [] }, // user IDs
};
