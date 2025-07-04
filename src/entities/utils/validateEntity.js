export function validateEntity(schema, data) {
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
