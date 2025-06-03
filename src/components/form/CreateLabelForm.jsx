import React, { useContext, useEffect, useState } from "react";
import { LABELS_COLOR, LIMIT } from "../../data/constants";
import LocalStorageContext from "../../context/LocalStorage";
function capitalizeEachWord(str) {
  return str
    .toLowerCase() // optional: makes sure first letter stands out
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CreateLabelForm({
  label,
  labelFormState,
  setLabelFormState,
}) {
  console.log(label);

  const [title, setTitle] = useState(label?.title || "");
  const [description, setDescription] = useState(label?.description || "");
  const [color, setColor] = useState(label?.color || "red");
  const { setLabels } = useContext(LocalStorageContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (labelFormState == "edit") {
      setLabels((prev) =>
        prev.map((label) =>
          label.id === label.id
            ? { ...label, title, description, color }
            : label
        )
      );
    }
    if (labelFormState == "new") {
      const label = {
        id: Date.now(),
        title: capitalizeEachWord(title),
        description,
        color,
      };
      setLabels((prev) => [...prev, label]);
    }
  }

  return (
    <div
      onClick={() => setLabelFormState("")}
      className="fixed w-screen h-screen bg-transparent top-0 left-0 flex justify-center items-center "
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="dark:bg-[#262c36] w-fit flex flex-col p-4 rounded-lg gap-2"
      >
        <h2>{capitalizeEachWord(title) || "New Label"}</h2>
        <input
          onInput={(e) => setTitle(e.target.value)}
          value={title}
          className="border px-2 py-1 rounded-lg"
          type="text"
          maxLength={LIMIT.LABLE_TITLE}
          minLength={3}
          name="title"
          placeholder="Enter label title"
        />
        <p className="text-xs font-thin">
          <span>{title.length}</span>/<span>{LIMIT.LABLE_TITLE}</span>
        </p>

        <select
          onSelect={(e) => setColor(e.target.value)}
          className="border px-2 py-1 rounded-lg"
          name="color"
        >
          {Object.keys(LABELS_COLOR).map((color) => (
            <option className="bg-black" key={color} value={color}>
              {color}
            </option>
          ))}
        </select>

        <textarea
          className="border px-2 py-1 rounded-lg"
          name="description"
          placeholder="Enter label description"
          maxLength={LIMIT.LABLE_DESCRIPTION}
          onInput={(e) => setDescription(e.target.value)}
        ></textarea>
        <p className="text-xs font-thin">
          <span>{description.length}</span>/
          <span>{LIMIT.LABLE_DESCRIPTION}</span>
        </p>

        <div className="flex gap-2 justify-end">
          <button className="cursor-pointer bg-green-500 font-bold w-fit px-2 py-1 rounded-md">
            Save
          </button>
          <button
            onClick={() => setLabelFormState("")}
            className="cursor-pointer bg-red-500 font-bold w-fit px-2 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
