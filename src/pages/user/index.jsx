// TODO : Refactore
import React from "react";
import Header from "./components/header";
import WelcomMessage from "./components/welcome-message";
import SearchWorkspace from "./components/search";
import Workspaces from "./components/workspaces";

// -------------------- MAIN USER COMPONENT ---------------------
export default function User() {
  return (
    <main className="bg-[#0f0f0f] text-white">
      <Header />
      <WelcomMessage />
      <SearchWorkspace />
      <Workspaces />
    </main>
  );
}
