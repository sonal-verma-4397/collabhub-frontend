import TaskGroup from "../task-group";
import Header from "./header";

export default function TaskList({ taskList = {} }) {
  console.log(taskList);
  return (
    <div className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg flex flex-col overflow-hidden py-2 h-[calc(100vh-130px)]">
      <Header {...taskList.status} />
      <TaskGroup tasks={taskList.tasks} />
    </div>
  );
}
