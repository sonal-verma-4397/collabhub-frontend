export function StatusSelect({ statuses, defaultValue, ...props }) {
  return (
    <select
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      {...props}
      defaultValue={defaultValue}
    >
      {statuses.map((status) => (
        <option key={status.id} value={status.title}>
          {status.title}
        </option>
      ))}
    </select>
  );
}
export function ColorSelect({ colors, defaultValue, ...props }) {
  return (
    <select
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      {...props}
      defaultValue={defaultValue}
    >
      {colors.map((color) => (
        <option key={color} value={color}>
          {color}
        </option>
      ))}
    </select>
  );
}
