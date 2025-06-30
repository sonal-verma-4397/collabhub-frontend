import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";

export default function NavItem({ item, depth }) {
  const [showChildren, setShowChildren] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const Component = item.path ? Link : "div";

  return (
    <div className="space-y-1" title={item.label} aria-label={item.label}>
      <Component to={item.path} className={`flex items-center gap-2 py-1`}>
        {item.icon && <item.icon size={18} />}
        <span>{item.label}</span>
        {!item.path && (
          <button onClick={() => setShowChildren(!showChildren)}>
            {showChildren ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </button>
        )}
      </Component>

      {showChildren && hasChildren && (
        <div className="pl-2 border-gray-600 ">
          {item.children.map((child) => (
            <NavItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
