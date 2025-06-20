import { useState } from "react";
import { COLOR_TO_HEX, DEFAULT_TAGS } from "../../data/constants";

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

export function TagInput(props) {
  const { onChange, selectedTags } = props;
  return (
    <div className="dark:bg-[#131416] rounded-xl border border-gray-600">
      <h4 className="m-2">Apply label to this Task</h4>
      <input
        placeholder="Search the tag..."
        className="w-full px-4 py-2 border border-x-0 dark:border-y-gray-600 bg-white dark:bg-[#1A1B1E] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      {selectedTags.length > 0 && (
        <section className="">
          <h4 className="dark:bg-[#1a1b1e] my-2 p-1 border border-y-gray-600 border-x-0">
            Selected
          </h4>
          {selectedTags.map((t) => (
            <div className="flex gap-2 px-2">
              <div className="flex gap-1">
                <input className="size-4" type="checkbox" />
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
        {DEFAULT_TAGS.map((tag) => mapToDefaultTags(tag, onChange))}
      </section>
      <button type="button" className="text-center block w-full m-2">
        Edit Labels
      </button>
    </div>
  );
}
function mapToDefaultTags(tag, onChange) {
  return (
    <div className="flex gap-2 px-2">
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
