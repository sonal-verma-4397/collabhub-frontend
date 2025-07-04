export const WorkspaceSchema = {
  id: { type: "string", default: () => crypto.randomUUID() },
  name: { type: "string", required: true, default: "" },
  description: { type: "string", default: "no description found" },
  modulesIds: { type: "array", default: () => [] },
};
