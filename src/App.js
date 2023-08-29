import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useContext } from "react";
import { AuthContext } from "./auth/AuthContext";

function App() {

  const { currentUser } = useContext(AuthContext);
  console.log("currentUser", currentUser);
  
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="/">
            <Route index element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
