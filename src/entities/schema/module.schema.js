export const ModuleSchema = {
  id: { type: "string", default: () => crypto.randomUUID() },
  name: { type: "string", required: true, default: "" },
  description: { type: "string", default: "" },
  pages: { type: "array", default: () => [] },
  tasks: { type: "array", default: () => [] },
  team: { type: "string", default: "" },
};
