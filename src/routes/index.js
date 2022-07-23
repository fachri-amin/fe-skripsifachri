import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Sales from "../pages/Sales";
import Motorcycle from "../pages/Motorcycle";

import RequireAuth from "./requireAuth";

const Routers = () => {
  return (
    <Routes>
      <Route
        key="auth-login"
        path="/auth/login"
        exact={true}
        element={<Login />}
      />
      <Route
        key="home"
        path="/"
        exact={true}
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        key="sales"
        path="/sales"
        exact={true}
        element={
          <RequireAuth>
            <Sales />
          </RequireAuth>
        }
      />
      <Route
        key="motorcycle"
        path="/motorcycle"
        exact={true}
        element={
          <RequireAuth>
            <Motorcycle />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default Routers;
