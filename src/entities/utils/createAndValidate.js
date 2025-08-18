export function create(schema) {
  const entity = {};
  for (let key in schema) {
    const def = schema[key];
    entity[key] =
      typeof def.default === "function" ? def.default() : def.default;
  }
  return entity;
}

export function validate(schema, data) {
  for (let key in schema) {
    const def = schema[key];
    const value = data[key];

    if (def.required && (value === undefined || value === "")) {
      throw new Error(`Field "${key}" is required`);
    }

    if (def.enum && !def.enum.includes(value)) {
      throw new Error(`Field "${key}" must be one of: ${def.enum.join(", ")}`);
    }
  }
  return true;
}

export function createAndValidate(schema, callback) {
  const defaults = create(schema) || {};  
  const entity = callback(defaults);
  try {
    validate(schema, entity);
    console.log("✅ Validation passed\n");
  } catch (err) {
    console.error("❌ Validation failed:", err.message);
  }
  return entity;
}
