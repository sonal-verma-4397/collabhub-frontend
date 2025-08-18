import React from "react";
import "./index.css";

import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
