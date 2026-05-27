import React, { useState } from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [search, setSearch] = useState("");
  const [addTrigger, setAddTrigger] = useState(0);

  // We pass a trigger counter to Dashboard so TopBar "Add Book" can open the modal
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