export function TitleInput({ ...props }) {
  return (
    <>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        title="title"
        placeholder="Enter task title"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        {...props}
      />
    </>
  );
}

export function StatusInput({ ...props }) {
  return (
    <>
    
      <input
        type="text"
        name="title"
        placeholder="Enter task label"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        {...props}
      />
    </>
  );
}

export function DateInput({ ...props }) {
  return (
    <input
      type="date"
      name="dueDate"
      className="flex cursor-pointer select-none items-center justify-center gap-1 px-2 py-1 text-sm border border-dashed border-gray-500 rounded-md text-white dark:bg-[#0f0f0f] hover:border-white hover:bg-gray-900 transition-colors duration-200"
      {...props}
    />
  );
}
