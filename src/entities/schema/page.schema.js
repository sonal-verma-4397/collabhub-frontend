export const PageSchema = {
  id: { type: "string", default: () => crypto.randomUUID() },
  name: { type: "string", required: true, default: "" },
  description: { type: "string", default: "" },
  content: { type: "array", default: () => [] },
};
