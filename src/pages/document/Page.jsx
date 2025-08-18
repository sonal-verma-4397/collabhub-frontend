import { GripVertical } from "lucide-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const initPage = {
  id: "page-1",
  type: "page",
  title: "Untitled Page",
  head: {
    banner: "",
  },
  body: [
    {
      id: "row-1",
      type: "row",
      blocks: [
        {
          id: "block-1",
          type: "text",
          content: "Sample text block 1.",
        },
      ],
    },
    {
      id: "row-2",
      type: "row",
      blocks: [
        {
          id: "block-2",
          type: "text",
          content: "Sample text block 2.",
        },
        {
          id: "block-3",
          type: "text",
          content: "Sample text block 3.",
        },
        {
          id: "block-4",
          type: "text",
          content: "Sample text block 4.",
        },
      ],
    },
    {
      id: "row-2",
      type: "row",
      blocks: [
        {
          id: "block-5",
          type: "text",
          content: "Sample text block 5.",
        },
        {
          id: "block-6",
          type: "text",
          content: "Sample text block 6.",
        },
        {
          id: "block-7",
          type: "text",
          content: "Sample text block 7.",
        },
      ],
    },
  ],
};

const getDropPosition = (e, targetElement) => {
  const rect = targetElement.getBoundingClientRect();
  const y = e.clientY - rect.top;
  const x = e.clientX - rect.left;
  const height = rect.height;
  const width = rect.width;

  // More precise drop zones
  if (y < height * 0.25) return "top";
  if (y > height * 0.75) return "bottom";
  if (x < width * 0.3) return "left";
  if (x > width * 0.7) return "right";
  return "center";
};

const getIndicatorStyle = (block, rowId, dropIndicator) => {
  if (
    !dropIndicator ||
    dropIndicator.blockId !== block.id ||
    dropIndicator.rowId !== rowId
  ) {
    return { display: "none" };
  }

  const baseStyle = {
    position: "absolute",
    backgroundColor: "#3b82f6",
    borderRadius: "1px",
    zIndex: 10,
  };

  switch (dropIndicator.position) {
    case "top":
      return {
        ...baseStyle,
        top: "-2px",
        left: "0",
        right: "0",
        height: "4px",
      };
    case "bottom":
      return {
        ...baseStyle,
        bottom: "-2px",
        left: "0",
        right: "0",
        height: "4px",
      };
    case "left":
      return {
        ...baseStyle,
        left: "-2px",
        top: "0",
        bottom: "0",
        width: "4px",
      };
    case "right":
      return {
        ...baseStyle,
        right: "-2px",
        top: "0",
        bottom: "0",
        width: "4px",
      };
    case "center":
      return { ...baseStyle, inset: "0", opacity: 0.1, height: "100%" };
    default:
      return { display: "none" };
  }
};

const findBlockAndRow = (page, blockId) => {
  for (const row of page.body) {
    for (const block of row.blocks) {
      if (block.id === blockId) return { block, row };
    }
  }
  return null;
};

export default function Page() {
  const params = useParams();
  const [page, setPage] = useState(initPage);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [dropIndicator, setDropIndicator] = useState(null);

  function handleDragStart(block) {
    return function (event) {
      setDraggedBlock(block);
      event.dataTransfer.effectAllowed = "move";
    };
  }

  function handleDragEnd() {
    return function () {
      setDraggedBlock(null);
      setDropIndicator(null);
    };
  }

  function handleDragOver(targetBlock, rowId) {
    return function (event) {
      event.preventDefault();
      if (!draggedBlock || draggedBlock.id === targetBlock.id) return;
      const position = getDropPosition(event, event.currentTarget);
      setDropIndicator({ blockId: targetBlock.id, rowId, position });
    };
  }

  function handleDrop(targetBlock, targetRowId) {
    return function (event) {
      event.preventDefault();

      if (!draggedBlock || draggedBlock.id === targetBlock.id) {
        setDropIndicator(null);
        return;
      }

      const position = getDropPosition(event, event.currentTarget);
      const shadowPage = JSON.parse(JSON.stringify(page));

      const targetRowIndex = shadowPage.body.findIndex(
        (row) => row.id === targetRowId
      );
      const draggedInfo = findBlockAndRow(shadowPage, draggedBlock.id);

      if (targetRowIndex === -1 || !draggedInfo) {
        setDropIndicator(null);
        return;
      }

      const draggedRowIndex = shadowPage.body.findIndex(
        (row) => row.id === draggedInfo.row.id
      );

      const targetBlockIndex = shadowPage.body[targetRowIndex].blocks.findIndex(
        (block) => block.id === targetBlock.id
      );

      // Remove dragged block from its current position
      shadowPage.body[draggedRowIndex].blocks.splice(
        shadowPage.body[draggedRowIndex].blocks.findIndex(
          (block) => block.id === draggedInfo.block.id
        ),
        1
      );

      // Clean up empty rows
      if (shadowPage.body[draggedRowIndex].blocks.length === 0) {
        shadowPage.body.splice(draggedRowIndex, 1);

        // Adjust target row index if we removed a row before it
        const newTargetRowIndex = shadowPage.body.findIndex(
          (row) => row.id === targetRowId
        );

        if (newTargetRowIndex === -1) {
          // Target row was removed, create a new row
          const newRow = {
            id: `row-${Date.now()}`,
            type: "row",
            blocks: [draggedInfo.block],
          };
          shadowPage.body.push(newRow);
          setPage(shadowPage);
          setDropIndicator(null);
          return;
        }
      }

      // Recalculate indices after potential row removal
      const finalTargetRowIndex = shadowPage.body.findIndex(
        (row) => row.id === targetRowId
      );
      const finalTargetBlockIndex = shadowPage.body[
        finalTargetRowIndex
      ].blocks.findIndex((block) => block.id === targetBlock.id);

      switch (position) {
        case "top":
          // Insert at the beginning of the target row
          const newRowAbove = {
            id: `row-${Date.now()}`,
            type: "row",
            blocks: [draggedInfo.block],
          };
          shadowPage.body.splice(finalTargetRowIndex, 0, newRowAbove);
          break;

        case "bottom":
          // Insert at the end of the target row
          const newRowBelow = {
            id: `row-${Date.now()}`,
            type: "row",
            blocks: [draggedInfo.block],
          }

          shadowPage.body.splice(finalTargetRowIndex + 1, 0, newRowBelow);
          break;

        case "left":
          // Insert before the target block
          shadowPage.body[finalTargetRowIndex].blocks.splice(
            finalTargetBlockIndex,
            0,
            draggedInfo.block
          );
          break;

        case "right":
          // Insert after the target block
          shadowPage.body[finalTargetRowIndex].blocks.splice(
            finalTargetBlockIndex + 1,
            0,
            draggedInfo.block
          );
          break;

        case "center":
          // Replace the target block or create a new row
          // For this implementation, we'll insert after the target block
          shadowPage.body[finalTargetRowIndex].blocks.splice(
            finalTargetBlockIndex + 1,
            0,
            draggedInfo.block
          );
          break;

        default:
          // Fallback: add to the end of the target row
          shadowPage.body[finalTargetRowIndex].blocks.push(draggedInfo.block);
          break;
      }

      setPage(shadowPage);
      setDropIndicator(null);
    };
  }

  return (
    <div className="p-4">
      <h1 className="text-6xl text-gray-400 p-2">Page: {page.title}</h1>
      {page.body.map(function (row) {
        return (
          <div key={row.id} className="row flex gap-2">
            {row.blocks.map(function (block) {
              return (
                <div
                  draggable
                  onDragStart={handleDragStart(block)}
                  onDragEnd={handleDragEnd()}
                  onDragOver={handleDragOver(block, row.id)}
                  onDrop={handleDrop(block, row.id)}
                  key={block.id}
                  className="flex items-center gap-1 relative shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Drop Indicator */}
                  <div
                    style={getIndicatorStyle(block, row.id, dropIndicator)}
                  />

                  <GripVertical className="w-4 h-4 text-gray-400 hover:cursor-grab active:cursor-grabbing" />
                  <p className="select-none">{block.content}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
