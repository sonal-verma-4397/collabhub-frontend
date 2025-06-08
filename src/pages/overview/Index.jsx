import { useContext } from "react";
import LocalStorageContext from "../../context/LocalStorage";
import { COLOR_TO_HEX } from "../../data/constants";
import MyAreaChart from "./MyAreaChart";
import LabelSummery from "./LabelSummery";
import MyPieChart from "./MyPieChart";

export default function Index() {
  const { tasks, labels } = useContext(LocalStorageContext);
  const getColor = (label) => COLOR_TO_HEX[label.color] || "#6b7280";

  return (
    <div className="h-full flex flex-col gap-6 p-6">
      <MyAreaChart tasks={tasks} labels={labels} getColor={getColor} />
      <LabelSummery tasks={tasks} labels={labels} />
      <MyPieChart tasks={tasks} labels={labels} getColor={getColor} />
    </div>
  );
}
