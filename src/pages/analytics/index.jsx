import { useContext } from "react";
import LocalStorageContext from "../../context/LocalStorage";
import MyAreaChart from "./components/MyAreaChart";
import LabelSummery from "./components/LabelSummery";
import MyPieChart from "./components/MyPieChart";

export default function Analytics() {
  const { tasks, statuses } = useContext(LocalStorageContext);

  return (
    <div className="h-full flex flex-col gap-6 ">
      <MyAreaChart tasks={tasks} statuses={statuses} />
      <LabelSummery tasks={tasks} statuses={statuses} />
      <MyPieChart tasks={tasks} statuses={statuses} />
    </div>
  );
}
