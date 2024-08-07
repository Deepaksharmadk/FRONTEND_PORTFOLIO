import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import NotFoundPage from "./components/NotFound/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <h2>Home Page</h2>
              </Container>
            }
          />
          <Route
            path="/register"
            element={
              <Container>
                <Register />
              </Container>
            }
          />

          <Route
            path="/sign-in"
            element={
              <Container>
                <Login />
              </Container>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <Container>
                  <NotFoundPage />
                </Container>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
