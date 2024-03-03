import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ErrorPage from "./pages/errorPage";
import "./index.css";
import { UserAuth } from "./authRelated/Authcontext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

function App() {
  const { currentUser } = UserAuth();

  const Protectedroute = ({ children }) => {
    if (currentUser && currentUser) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Protectedroute>
                <Home />
              </Protectedroute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<ErrorPage />} />
          {/* <Register /> */}
          {/* <Login /> */}
          {/* <Home /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
