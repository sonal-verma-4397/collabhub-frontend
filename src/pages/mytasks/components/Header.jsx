import { useContext } from "react";
import Menu from "../../../components/utility/Menu";
import { STATUS_COLOR } from "../../../data/constants";
import LocalStorageContext from "../../../context/LocalStorage";

export default function Header({ color, title, id, openEditForm }) {
  const { statuses, setStatuses } = useContext(LocalStorageContext);

  function deleteList() {
    const newStatuses = statuses.filter((s) => s.id !== id);
    setStatuses(newStatuses);
  }
  const handleEditStatus = () => openEditForm(true);
  return (
    <h2 className="dark:text-white text-center py-2 px-4 font-bold flex items-center justify-between">
      <div
        className={`size-4 border-2  ${STATUS_COLOR[color]} rounded-full`}
      ></div>
      <span>{title}</span>
      <Menu
        onDelete={deleteList}
        onEdit={handleEditStatus}
        positionClass="top-8 right-0"
      />
    </h2>
  );
}
