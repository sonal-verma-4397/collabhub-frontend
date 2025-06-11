import { useContext, useState } from "react";
import { LABELS_COLOR } from "../../../data/constants";
import { CreateBtn } from "../../../components/ui/Button";
import Task from "./Task";
import Menu from "../../../components/utility/Menu";
import TaskForm from "../../../components/form/TaskForm";
import LabelForm from "../../../components/form/LabelForm";
import LocalStorageContext from "../../../context/LocalStorage";

export default function TaskList({ label, tasks, handleDrop, handleDragOver }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showLabelForm, setShowLabelForm] = useState(false);

  const { labels, setLabels } = useContext(LocalStorageContext);

  function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.id);
  }

  function sortByCreatedDate(a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  function renderTask(task) {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        label={task.label}
        priority={task.priority}
        createdAt={task.createdAt}
        updatedAt={task.updatedAt}
        handleDragStart={handleDragStart}
      />
    );
  }

  function handleDeleteList() {
    const newLabels = labels.filter((l) => l.id !== label.id);
    setLabels(newLabels);
  }

  const handleEditLabel = () => setShowLabelForm(true);

  const sortedTasks = [...tasks].sort(sortByCreatedDate);

  return (
    <>
      <section
        role="task-list"
        data-label={label.title}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <h2 className="dark:text-white text-center py-2 px-4 font-bold flex items-center justify-between">
          <div
            className={`size-4 border-2  ${
              LABELS_COLOR[label.color]
            } rounded-full`}
          ></div>
          <span>{label.title}</span>
          <Menu onDelete={handleDeleteList} onEdit={handleEditLabel} />
        </h2>
        <div className="h-[730px] overflow-y-auto">
          {sortedTasks.map(renderTask)}
        </div>
        <CreateBtn
          label={"+ Create Task"}
          onClick={() => {
            setShowTaskForm(true);
          }}
        />
      </section>

      {showTaskForm && (
        <TaskForm
          closeForm={() => setShowTaskForm(false)}
          defaultLabel={label.title}
        />
      )}
      {showLabelForm && (
        <LabelForm
          isEdit={true}
          oldLabel={label}
          closeForm={() => setShowLabelForm(false)}
        />
      )}
    </>
  );
}
