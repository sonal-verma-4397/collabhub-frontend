import React, { useContext } from "react";
import NavItem from "./nav-item";
import { generateDynamicSidebarConfig } from "../config";
import LocalStorageContext from "../../../../context/LocalStorage";
import { useParams } from "react-router-dom";

export default function NavItems() {
  const params = useParams();

  const { workspaces, modules, pages } = useContext(LocalStorageContext);
  const dySidebarConfig = generateDynamicSidebarConfig({
    workspaces,
    modules,
    pages,
  });

  const navConfig = dySidebarConfig[params.workspaceId];

  // console.log(navConfig);

  return (
    <div className="p-3 space-y-1 flex-1 overflow-y-auto">
      {navConfig.map((item) => (
        <NavItem key={item.id} id={item.id} item={item} depth={0} />
      ))}
    </div>
  );
}
