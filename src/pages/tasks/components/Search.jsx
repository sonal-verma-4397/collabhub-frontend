export default function Search({
  queryFilter,
  setQueryFilter,
  query,
  setQuery,
}) {
  return (
    <section className="m-1 flex gap-2">
      <select
        className="dark:bg-[#131416] rounded-lg"
        value={queryFilter}
        onChange={(e) => setQueryFilter(e.target.value)}
      >
        <option className="dark:bg-[#0f0f0f]" value="TITLE_FILTER">
          Title
        </option>
        <option className="dark:bg-[#0f0f0f]" value="DESCRIPTION_FILTER">
          Description
        </option>
      </select>
      <input
        className="p-1 rounded-lg px-2 dark:bg-[#131416]"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        placeholder="Search by title"
      />
    </section>
  );
}
