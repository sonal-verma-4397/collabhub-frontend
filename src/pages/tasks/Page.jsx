import React, { useContext, useEffect, useState } from "react";
import Search from "./components/Search";
import TaskList from "./components/TaskList";
import TaskListForm from "../../components/form/TaskList";
import TaskPrivew from "./components/TaskPrivew";
import useDragDrop from "./hooks/useDragDrop";
import LocalStorageContext from "../../context/LocalStorage";
import { AddNewTaskListBtn } from "../../components/ui/Button";
import { TaskPreviewContext } from "../../context/TaskPreview";
import { filterTasksByStatus } from "../../utils/filters";
import { useParams } from "react-router-dom";

export default function Page() {
  const { statuses, tasks, modules } = useContext(LocalStorageContext);
  const { taskPreview } = useContext(TaskPreviewContext);
  const { handleDrop } = useDragDrop();
  const [query, setQuery] = useState("");
  const [showTaskListForm, setShowTaskListForm] = useState(false);
  const [queryFilter, setQueryFilter] = useState("TITLE_FILTER");
  const params = useParams();

  function mapToTaskList(status) {
    const tasksByStatus = filterTasksByStatus(tasks, status.title);
    const filterByTitleQuery = (task) =>
      task.title.toLowerCase().startsWith(query.trim().toLowerCase());
    const filterByDescriptionQuery = (task) =>
      task.description.toLowerCase().startsWith(query.trim().toLowerCase());
    const moduleFilter = (task) => {
      const module = modules.find((mod) => mod.id === params.moduleId);
      return module.tasks.includes(task.id);
    };
    const FILTER = {
      TITLE_FILTER: filterByTitleQuery,
      DESCRIPTION_FILTER: filterByDescriptionQuery,
    };

    return (
      <TaskList
        key={status.id}
        status={status}
        tasks={tasksByStatus.filter(moduleFilter).filter(FILTER[queryFilter])}
        handleDrop={handleDrop}
      />
    );
  }

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
        {statuses.map(mapToTaskList)}
        <AddNewTaskListBtn openForm={setShowTaskListForm} />
        {showTaskListForm && <TaskListForm closeForm={setShowTaskListForm} />}
      </section>

      {taskPreview && <TaskPrivew />}
    </div>
  );
}
