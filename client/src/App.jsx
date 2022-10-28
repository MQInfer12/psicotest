import "./App.css";
import styled from "styled-components";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import Contexts from "./wrappers/contexts";
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
import Test from "./pages/test";
import TestCreator from "./pages/testCreator";
import TestView from "./pages/testView";
import Answers from "./pages/answers";
import Chat from "./pages/chat";
import Answer from "./pages/answer";
import None from "./pages/none";
import Landing from "./pages/landing";

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  color: #ada7a7;
  display: flex;
  flex-direction: column;

  &::after {
    content: "";
    width: 0%;
    border-top: 1px solid #ada7a7;
    transition: all 0.2s;
  }

  &:hover::after {
    width: 100%;
  }
`;

function App() {
  return (
    <HashRouter>
      <Contexts>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:userEmail" element={<Register />} />
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
              path="chat"
              element={
                <OutletContext titlePage="Chat">
                  <Chat />
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
                <ProtectedRole roles={[3, 2, 1]}>
                  <OutletContext titlePage="Tests" calendar={false}>
                    <Test />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route
              path="tests/:idTest"
              element={
                <ProtectedRole roles={[3]}>
                  <OutletContext
                    titlePage="Creación de Test"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>
                        /
                      </>
                    }
                  >
                    <TestCreator />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route
              path="tests/:idTest"
              element={
                <ProtectedRole roles={[3]}>
                  <OutletContext
                    titlePage="Creación de Test"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <TestCreator />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route
              path="tests/testview/:idTest"
              element={
                <ProtectedRole roles={[2, 3]}>
                  <OutletContext
                    titlePage="Vista previa"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <TestView />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route
              path="tests/testresolve/:idRespuesta"
              element={
                <ProtectedRole roles={[1]}>
                  <OutletContext
                    titlePage="Resolver el test"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <TestView />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            {/* <Route
              path="groups"
              element={
                <ProtectedRole roles={[2]}>
                  <OutletContext titlePage="Grupos" calendar={false}>
                    <Group />
                  </OutletContext>
                </ProtectedRole>
              }
            /> */}
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
            <Route
              path="answers"
              element={
                <ProtectedRole roles={[3, 2]}>
                  <OutletContext titlePage="Respuestas" calendar={false}>
                    <Answers />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route
              path="answers/:idRespuesta"
              element={
                <ProtectedRole roles={[3, 2]}>
                  <OutletContext
                    titlePage="Detalles de Respuesta"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/answers">Respuestas</StyledLink>/
                      </>
                    }
                  >
                    <Answer />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route path="*" element={<None redirect="/dashboard/tests" />} />
          </Route>
          <Route path="*" element={<None redirect="/login" />} />
        </Routes>
      </Contexts>
    </HashRouter>
  );
}

export default App;
