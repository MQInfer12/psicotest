import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext } from "./context/userContext";
import OutletContext from "./context/outletContext";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import User from "./pages/user";
import Group from "./pages/group";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import Test from './pages/test';

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
            <Route 
              path="" 
              element={
                <OutletContext titlePage="Home" calendar={false}>
                  <Home />
                </OutletContext>
              } 
            />
            <Route 
              path="users" 
              element={
                <OutletContext titlePage="Usuarios" calendar={false}>
                  <User />
                </OutletContext>
              } 
            />
            <Route 
              path="tests" 
              element={
                <OutletContext titlePage="Tests" calendar={true}>
                  <Test />
                </OutletContext>
              } 
            />
            <Route 
              path="groups" 
              element={
                <OutletContext titlePage="Grupos" calendar={false}>
                  <Group />
                </OutletContext>
              } 
            />
            <Route 
              path="profile" 
              element={
                <OutletContext titlePage="Perfil" calendar={false}>
                  <Profile />
                </OutletContext>
              } 
            />
            <Route 
              path="calendar" 
              element={
                <OutletContext titlePage="Calendario" calendar={false}>
                <Calendar />
                </OutletContext>
              } 
            />
          </Route>
          <Route path="*" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
