import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function Page() {
  const params = useParams();

  const arr = [
    "block 1",
    "block 2",
    "block 3",
    "block 4",
    "block 5",
    "block 6",
  ];

  const [blocks, setBlocks] = useState(arr);

  // console.log(blocks.slice(0, 2), blocks.splice(2));

  function insertAtNthPostion(arr, index, value) {
    return [...arr.slice(0, index), value, ...arr.slice(index)];
  }

  function handleClick() {
    const startPos = blocks.length - 1;
    const endPos = 1;

    setBlocks((prev) => {
      return insertAtNthPostion(prev, endPos, "a");
    });
  }
  return (
    <div className="p-4">
      <h1 className="text-6xl text-gray-400 p-2">Page: </h1>
      <div>
        {blocks?.map((e) => (
          <div key={e}>{e}</div>
        ))}
      </div>
      <button
        onClick={handleClick}
        className="p-2 border cursor-pointer rounded-lg"
      >
        move last block at 2nd position
      </button>
    </div>
  );
}
