import React, { useContext, useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import LabelForm from "../../components/form/LabelForm";
import LocalStorageContext from "../../context/LocalStorage";
import { filterTasksByLabel } from "../../utils/filters";
import { AddNewLabelBtn } from "../../components/ui/Button";
import useDragDrop from "./hooks/useDragDrop";
import Search from "./components/Search";

export default function Page() {
  const { labels, tasks } = useContext(LocalStorageContext);
  const [showLabelForm, setShowLabelForm] = useState(false);
  const { handleDrop } = useDragDrop();
  const [query, setQuery] = useState("");
  const [queryFilter, setQueryFilter] = useState("TITLE_FILTER");

  function mapToTaskList(label) {
    const tasksByLabel = filterTasksByLabel(tasks, label.title);
    const filterByTitleQuery = (task) =>
      task.title.toLowerCase().startsWith(query.trim().toLowerCase());
    const filterByDescriptionQuery = (task) =>
      task.description.toLowerCase().startsWith(query.trim().toLowerCase());

    const FILTER = {
      TITLE_FILTER: filterByTitleQuery,
      DESCRIPTION_FILTER: filterByDescriptionQuery,
    };

    return (
      <TaskList
        key={label.id}
        label={label}
        tasks={tasksByLabel.filter(FILTER[queryFilter])}
        handleDrop={handleDrop}
      />
    );
  }

  useEffect(() => {
    console.log(query);
  }, [query]);
  return (
    <div>
      <section className="m-1 flex gap-2">
        <Search
          query={query}
          setQuery={setQuery}
          queryFilter={queryFilter}
          setQueryFilter={setQueryFilter}
        />
      </section>
      <section className="flex gap-2 w-[1456px] overflow-auto ">
        {labels.map(mapToTaskList)}
        <AddNewLabelBtn openLabelForm={setShowLabelForm} />
        {showLabelForm && <LabelForm closeForm={setShowLabelForm} />}
      </section>
    </div>
  );
}
