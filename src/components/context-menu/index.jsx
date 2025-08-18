import { Button } from "../ui/html-tags";

export default function ContextMenu({ position, onClose, onRename, onDelete }) {
  const handleRename = () => {
    onRename?.();
    onClose();
  };

  const handleDelete = () => {
    onDelete?.();
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        backgroundColor: "#1f1f1f",
        color: "white",
        borderRadius: "6px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
        width: "150px",
      }}
      onClick={(e) => e.stopPropagation()}
      className="py-2"
    >
      <Button
        onClick={handleRename}
        className={[
          "px-4 py-2 hover:bg-[#333] cursor-pointer select-none",
        ]}
      >
        Rename
      </Button>
      <Button
        onClick={handleDelete}
        className={["px-4 py-2 hover:bg-[#333] cursor-pointer"]}
      >
        Delete
      </Button>
    </div>
  );
}
