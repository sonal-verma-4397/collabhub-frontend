import { useContext } from "react";
import LocalStorageContext from "../../context/LocalStorage";
import MyAreaChart from "./components/MyAreaChart";
import LabelSummery from "./components/LabelSummery";
import MyPieChart from "./components/MyPieChart";

export default function Page() {
  const { tasks, labels } = useContext(LocalStorageContext);

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <MyAreaChart tasks={tasks} labels={labels} />
      <LabelSummery tasks={tasks} labels={labels} />
      <MyPieChart tasks={tasks} labels={labels} />
    </div>
  );
}
