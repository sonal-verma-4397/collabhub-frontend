import { useState } from "react";
import { CreateTaskBtn } from "../../../components/ui/Button";
import TaskForm from "../../../components/form/TaskForm";
import TaskListForm from "../../../components/form/TaskList";
import Header from "./Header";
import Tasks from "./Tasks";

export default function TaskList({ status, tasks, handleDrop }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);
  const handleDragOver = (e) => e.preventDefault();
  return (
    <>
      <section
        role="task-list"
        data-status={status.title}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg flex flex-col overflow-hidden"
      >
        <Header openEditForm={setShowStatusForm} {...status} />
        <Tasks tasks={tasks} />
        <CreateTaskBtn
          status={"+ Create Task"}
          openTaskForm={setShowTaskForm}
        />
      </section>

      {/* Pop Up Components */}
      {showTaskForm && (
        <TaskForm
          closeForm={() => setShowTaskForm(false)}
          defaultStatus={status.title}
        />
      )}
      {showStatusForm && (
        <TaskListForm
          isEdit={true}
          oldStatus={status}
          closeForm={() => setShowStatusForm(false)}
        />
      )}
    </>
  );
}
