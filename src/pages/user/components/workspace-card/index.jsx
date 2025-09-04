import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../../../../components/utility/Menu";
import Text from "../../../../components/ui/Text";

// -------------------- WORKSPACE CARD ---------------------
export default function WorkspaceCard({ ws, handleDelete, handleEdit }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const closeOnClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", closeOnClickOutside);
    return () => document.removeEventListener("mousedown", closeOnClickOutside);
  }, []);

  const handleCardClick = () => {
    navigate(`/workspaces/${ws._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative p-4 rounded-lg border border-gray-700 bg-[#1a1a1a] hover:bg-[#242424] transition-colors flex justify-between items-start"
    >
      <div>
        <Text className={["text-xl font-medium mb-1"]}>{ws.name}</Text>
        <div className="text-sm text-gray-400">{ws.description}</div>
      </div>
      <Menu onDelete={handleDelete(ws._id)} onEdit={handleEdit(ws)} />
    </div>
  );
}
