import TaskGroup from "../task-group";
import Header from "./header";

export default function TaskList({ taskList = {} }) {
  console.log(taskList);
  return (
    <div className="bg-white dark:bg-[#121316] shrink-0  w-[330px] rounded-lg shadow-lg inline-block overflow-hidden py-2 h-[] align-top">
      <Header {...taskList.status} />
      <TaskGroup tasks={taskList.tasks} />
    </div>
  );
}
