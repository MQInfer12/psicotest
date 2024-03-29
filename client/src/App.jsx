import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Contexts from "./wrappers/contexts";
import OutletContext from "./wrappers/outletContext";
import ProtectedRoute from "./wrappers/protectedRoute";
import ProtectedRole from "./wrappers/protectedRole";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import User from "./pages/user";
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
import Developers from "./pages/developers";
import TestShare from "./pages/testShare";
import Thanks from "./pages/thanks";
import ProtectedThanks from "./wrappers/protectedThanks";
import Modal from "./components/globals/modal";
import Blog from "./pages/blog";
import { StyledLink } from "./styles/pages/dashboard";
import { TestCreatorContextProvider } from "./context/testCreatorContext";
import Recover from "./pages/recover";
import Collaborate from "./pages/collaborate";

function App() {
  return (
    <HashRouter>
      <Contexts>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:goTo" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/:goTo" element={<Register />} />
          <Route path="/register/email/:userEmail" element={<Register />} />
          <Route path="/recover" element={<Recover />}/>
          <Route path="/recover/:goTo" element={<Recover />}/>
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
                <ProtectedRole roles={[2, 3]}>
                  <OutletContext
                    titlePage="Creación de Test"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <TestCreatorContextProvider>
                      <TestCreator />
                    </TestCreatorContextProvider>
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
              path="tests/share/:idDocenteTest"
              element={
                <ProtectedRole roles={[1]}>
                  <OutletContext
                    titlePage="Compartir"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <TestShare />
                  </OutletContext>
                </ProtectedRole>
              }
            />
            <Route
              path="tests/collab/:idTest"
              element={
                <ProtectedRole roles={[2, 3]}>
                  <OutletContext
                    titlePage="Colaborar"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <Collaborate />
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
            <Route
              path="tests/thanks"
              element={
                <ProtectedThanks>
                  <OutletContext
                    titlePage="Resuelto"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/tests">Tests</StyledLink>/
                      </>
                    }
                  >
                    <Thanks />
                  </OutletContext>
                </ProtectedThanks>
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
              path="blogs"
              element={
                <OutletContext titlePage="Blogs" calendar={false}>
                  <Blog />
                </OutletContext>
              }
            />
            <Route
              path="answers/:idRespuesta"
              element={
                <ProtectedRole roles={[3, 2]}>
                  <OutletContext
                    titlePage="Detalles"
                    calendar={false}
                    links={
                      <>
                        <StyledLink to="/dashboard/answers">Respuestas</StyledLink>
                        /
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
        <Modal />
      </Contexts>
    </HashRouter>
  );
}

export default App;