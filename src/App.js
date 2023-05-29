import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router";
import Chat from "./components/Chat";
import User from "./components/User";
function App() {
  const [id, setId] = useState("");
  const setUserId = React.useCallback((e) => {
    setId(() => e.target.id);
  });
  return (
    <div className="App flex flex-row">
      <User onUserChange={setUserId}></User>
      <Chat receiverId={id}></Chat>
    </div>
  );
}

export default App;
