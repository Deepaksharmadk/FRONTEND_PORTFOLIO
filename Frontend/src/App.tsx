import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import Header from "./components/Header/Header";
import { Register } from "./pages/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Container>
                <Header />
              </Container>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <h2>404</h2>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Container>
                <Register />
              </Container>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
