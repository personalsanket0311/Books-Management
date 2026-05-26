import React, { useState, useRef } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [search, setSearch] = useState("");
  const [addTrigger, setAddTrigger] = useState(0);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background font-sans">
      <TopBar
        search={search}
        onSearchChange={setSearch}
        onAddBook={() => setAddTrigger((n) => n + 1)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Dashboard
          search={search}
          onSearchChange={setSearch}
          addTrigger={addTrigger}
        />
      </div>
    </div>
  );
}
