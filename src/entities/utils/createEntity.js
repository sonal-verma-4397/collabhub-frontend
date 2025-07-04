import { validateEntity } from "./validateEntity";

function createEntity(schema) {
  const entity = {};
  for (let key in schema) {
    const def = schema[key];
    entity[key] =
      typeof def.default === "function" ? def.default() : def.default;
  }
  return entity;
}

export function createAndValidate(schema, customValues = {}) {
  const entity = { ...createEntity(schema), ...customValues };
  try {
    validateEntity(schema, entity);
    console.log("✅ Validation passed\n");
  } catch (err) {
    console.error("❌ Validation failed:", err.message);
  }
  return entity;
}
