import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext } from "./context/userContext";
import OutletContext from "./wrappers/outletContext";
import ProtectedRoute from "./wrappers/protectedRoute";
import ProtectedRole from "./wrappers/protectedRole";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import User from "./pages/user";
import Group from "./pages/group";
import Profile from "./pages/profile";
import Home from "./pages/home";
import Calendar from "./pages/calendar";
import Test from './pages/test';
import TestCreator from "./pages/testCreator";
import TestView from "./pages/testView";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({user, setUser}), [user, setUser]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          >
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
                <ProtectedRole roles={[3]}>
                  <OutletContext titlePage="Usuarios" calendar={false}>
                    <User />
                  </OutletContext>
                </ProtectedRole>
              } 
            />
            <Route 
              path="tests" 
              element={
                <ProtectedRole roles={[3]}>
                  <OutletContext titlePage="Tests" calendar={true}>
                    <Test />
                  </OutletContext>
                </ProtectedRole>
              } 
            />
            <Route 
              path="tests/:idTest" 
              element={
                <ProtectedRole roles={[3]}>
                  <OutletContext titlePage="Creación de Test" calendar={false}>
                    <TestCreator />
                  </OutletContext>
                </ProtectedRole>
              } 
            />
            <Route 
              path="testview/:idTest" 
              element={
                <ProtectedRole roles={[3]}>
                  <OutletContext titlePage="" calendar={false}>
                    <TestView />
                  </OutletContext>
                </ProtectedRole>
              } 
            />
            <Route 
              path="groups" 
              element={
                <ProtectedRole roles={[2]}>
                  <OutletContext titlePage="Grupos" calendar={false}>
                    <Group />
                  </OutletContext>
                </ProtectedRole>
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
