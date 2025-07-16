import TaskList from "../task-list";

export default function TaskListGroup({ taskLists = [] }) {
  return taskLists.map(function mapToTaskList(taskList) {
    return <TaskList key={taskList.status.id} taskList={taskList} />;
  });
}
