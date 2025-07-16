import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Button, Input, Section } from "../../components/ui/html-tags";
import TaskListGroup from "./components/tasklist-group";
import { useContext } from "react";
import LocalStorageContext from "../../context/LocalStorage";
import Text from "../../components/ui/Text";
import { Plus } from "lucide-react";

export default function TasksBoard() {
  const { tasks, statuses, modules } = useContext(LocalStorageContext);
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");
  const params = useParams();

  const moduleName = modules.find((mod) => mod.id === params.moduleId)?.name;

  const taskLists = statuses.map((status) => {
    const tasksByStatus = tasks.filter((task) => task.status === status.title);
    return {
      status,
      tasks: tasksByStatus,
    };
  });

  // console.log(taskLists);
  return (
    <div className="h-screen overflow-y-auto">
      <Text html_tag="h2" className={["text-xl", "font-semibold", "mx-4 my-2"]}>
        {moduleName}
      </Text>
      <div>
        <Input
          className={["my-2"]}
          name="search"
          placeholder="Search your tasks ..."
        />
        <div className="overflow-x-scroll flex gap-4 px-4 py-2 items-start">
          <TaskListGroup taskLists={taskLists} />
          <Button
            className={[
              "dark:bg-[#131416]",
              "p-2",
              "rounded-md",
              "border border-gray-600",
            ]}
          >
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
