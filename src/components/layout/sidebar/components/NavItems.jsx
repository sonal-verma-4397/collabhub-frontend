import React from "react";
import NavItem from "./NavItem";
import { navConfig } from "../config";

export default function NavItems() {
  return (
    <div className="p-3 space-y-1 flex-1 overflow-y-auto">
      {navConfig.map((item) => (
        <NavItem key={item.id} item={item} depth={0} />
      ))}
    </div>
  );
}
