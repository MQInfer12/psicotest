import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext } from "./context/userContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import User from "./pages/user";

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
              <Route path="users" element={<User />} />
            </Route>
            <Route path="*" element={<Login />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
