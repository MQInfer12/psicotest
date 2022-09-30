import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext } from "./context/userContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import User from "./pages/user";
import Group from "./pages/group";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Calendar from "./pages/calendar";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} >
            <Route path="" element={<Home />} />
            <Route path="users" element={<User />} />
            <Route path="groups" element={<Group />} />
            <Route path="profile" element={<Profile />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
