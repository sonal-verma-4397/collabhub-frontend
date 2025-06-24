import React, { useEffect, useRef, useState } from "react";

export default function Label(props) {
  const { onChange, selectedLabels, allLabels, closeForm } = props;
  const form = useRef(null);
  const [searching, setSearching] = useState(false);
  const unSelectedLabels = allLabels.filter(
    (t) => !selectedLabels?.some((s) => s.id == t.id)
  );
  const [suggestedLabels, setSuggestedLabels] = useState(unSelectedLabels);

  useEffect(() => {
    setSuggestedLabels(unSelectedLabels);
  }, [onChange]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (form.current && !form.current.contains(event.target)) {
        closeForm(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSearchInput() {
    return (e) => {
      const search = e.target.value.toLowerCase();
      setSearching(true);
      if (search.length === 0) setSearching(false);
      setSuggestedLabels(
        unSelectedLabels.filter((t) => t.title.toLowerCase().includes(search))
      );
    };
  }

  return (
    <div
      ref={form}
      className="absolute w-70 z-10 dark:bg-[#131416] rounded-xl border border-gray-600"
    >
      <h4 className="m-2">Apply label to this Task</h4>
      <input
        onInput={handleSearchInput()}
        placeholder="Search the tag..."
        className="w-full px-4 py-2 border border-x-0 dark:border-y-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <div className="h-50 overflow-y-auto">
        {selectedLabels?.length > 0 && (
          <section className="">
            <h4 className="dark:bg-[#1a1b1e] my-2 p-1 border border-y-gray-600 border-x-0">
              Selected
            </h4>
            {selectedLabels.map((t) => (
              <div key={t.id} className="flex gap-2 px-2">
                <div className="flex gap-1">
                  <input
                    onChange={(e) => onChange(e, t)}
                    className="size-4"
                    type="checkbox"
                    checked={selectedLabels.some((s) => s.id == t.id)}
                  />
                  <div
                    style={{ backgroundColor: t.color }}
                    className="size-4 rounded-full"
                  ></div>
                </div>
                <div>
                  <span>{t.title}</span> <br />
                  <span className="opacity-30 text-sm">{t.description}</span>
                </div>
              </div>
            ))}
          </section>
        )}
        <section className="border-gray-600">
          <h4 className="dark:bg-[#1a1b1e] my-2 p-1 border border-y-gray-600 border-x-0">
            Suggestion
          </h4>
          {suggestedLabels.map((tag) => mapToDefaultTags(tag, onChange))}
        </section>
      </div>
      <button type="button" className="text-center block w-full m-2">
        Edit Labels
      </button>
    </div>
  );
}
function mapToDefaultTags(tag, onChange) {
  return (
    <div key={tag.id} className="flex gap-2 px-2">
      <div className="flex gap-1">
        <input
          onChange={(e) => onChange(e, tag)}
          className="size-4"
          type="checkbox"
        />
        <div
          style={{ backgroundColor: tag.color }}
          className="size-4 rounded-full"
        ></div>
      </div>
      <div>
        <span>{tag.title}</span> <br />
        <span className="opacity-30 text-sm">{tag.description}</span>
      </div>
    </div>
  );
}
