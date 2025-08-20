import React, { useContext, useState } from "react";
import { STATUS_COLOR, LIMIT } from "../../data/constants";
import LocalStorageContext from "../../context/LocalStorage";
import { toasterContext } from "../../context/Toaster";
import { StatusInput } from "../ui/my-Input";
import { DescriptionInput } from "../ui/TextArea";
import { ColorSelect } from "../ui/Select";
import { AddBtn, CloseBtn } from "../ui/my-button";

function capitalizeEachWord(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function TaskList({ oldStatus, isEdit = false, closeForm }) {
  const [title, setTitle] = useState(isEdit ? oldStatus?.title : "");
  const [description, setDescription] = useState(
    isEdit ? oldStatus?.description : ""
  );
  const [color, setColor] = useState(isEdit ? oldStatus?.color : "red");

  const { setStatuses, statuses } = useContext(LocalStorageContext);
  const { showToast } = useContext(toasterContext);

  function createLabel() {
    if (title < 3) {
      showToast("At least 3 charater are required", "error");
      throw new Error("At least 3 charater are required");
    }

    const newStatus = {
      id: Date.now(),
      title: capitalizeEachWord(title),
      description,
      color,
    };
    setStatuses((prev) => [...prev, newStatus]);
  }

  function updateStatus() {
    setStatuses(
      statuses.map((label) =>
        label.id === oldStatus.id
          ? { ...label, title, description, color }
          : label
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    isEdit ? updateStatus() : createLabel();
  }

  const handleFormClose = () => closeForm(false);

  return (
    <div
      onClick={handleFormClose}
      className="fixed w-screen h-screen bg-transparent top-0 left-0 flex justify-center items-center "
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-[#262c36] w-fit flex flex-col p-4 rounded-lg gap-2"
      >
        <h2>{capitalizeEachWord(title) || "New Status"}</h2>
        <StatusInput
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          maxLength={LIMIT.STATUS_TITLE}
          minLength={3}
        />
        <span className="text-xs font-thin">{`${title.length}/${LIMIT.STATUS_TITLE}`}</span>

        <ColorSelect
          colors={Object.keys(STATUS_COLOR)}
          onChange={(e) => setColor(e.target.value)}
          defaultValue={color}
        />
        <DescriptionInput
          maxLength={LIMIT.STATUS_DESCRIPTION}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <span className="text-xs font-thin">{`${description.length}/${LIMIT.STATUS_DESCRIPTION}`}</span>

        <div className="flex gap-2 justify-end">
          <AddBtn label={"Save"} />
          <CloseBtn label={"Cancel"} onClick={handleFormClose} />
        </div>
      </form>
    </div>
  );
}
