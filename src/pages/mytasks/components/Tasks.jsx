import React from "react";
import Task from "./Task";

export default function Tasks({ tasks }) {
  const handleDragStart = (e) =>
    e.dataTransfer.setData("text/plain", e.currentTarget.dataset.id);

  function mapToTask(task) {
    return <Task key={task.id} task={task} handleDragStart={handleDragStart} />;
  }
  return (
    <section className="h-[620px] overflow-y-auto">
      {tasks.map(mapToTask)}
    </section>
  );
}
