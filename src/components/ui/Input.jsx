export function TitleInput({ ...props }) {
  return (
    <input
      type="text"
      name="title"
      placeholder="Enter task title"
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      {...props}
    />
  );
}

export function LabelInput({ ...props }) {
  return (
    <input
      type="text"
      name="title"
      placeholder="Enter task label"
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      {...props}
    />
  );
}

export function DateInput({ ...props }) {
  return (
    <input
      type="date"
      name="dueDate"
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      {...props}
    />
  );
}

