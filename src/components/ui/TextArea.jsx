export function DescriptionInput({ ...props }) {
  return (
    <textarea
      name="description"
      placeholder="Enter description"
      rows={4}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 resize-none"
      {...props}
    />
  );
}
