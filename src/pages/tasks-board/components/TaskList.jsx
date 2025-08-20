import { useState } from "react";
import { CreateTaskBtn } from "../../../components/ui/my-button";
import TaskForm from "../../../components/form/TaskForm";
import TaskListForm from "../../../components/form/TaskList";
import Header from "./Header";
import Tasks from "./Tasks";
import { Button } from "../../../components/ui/html-tags";
import { Plus } from "lucide-react";
import Text from "../../../components/ui/Text";

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
        className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg overflow-hidden inline-block align-top h-[700px]"
      >
        <Header openEditForm={setShowStatusForm} {...status} />
        <Tasks tasks={tasks} />
        <Button
          onClick={() => setShowTaskForm(true)}
          className={["p-4 flex justify-center gap-2"]}
        >
          <Plus />
          <Text>Create Task</Text>
        </Button>
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
