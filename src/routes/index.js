import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "pages/Login";
import Sales from "pages/Sales";
import SalesAdd from "pages/SalesAdd";
import SalesEdit from "pages/SalesEdit";
import Motorcycle from "pages/Motorcycle";
import MotorcycleAdd from "pages/MotorcycleAdd";
import MotorcycleEdit from "pages/MotorcycleEdit";

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
        key="sales-add"
        path="/sales/add"
        exact={true}
        element={
          <RequireAuth>
            <SalesAdd />
          </RequireAuth>
        }
      />
      <Route
        key="sales-edit"
        path="/sales/edit/:id"
        exact={true}
        element={
          <RequireAuth>
            <SalesEdit />
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
      <Route
        key="motorcycle-add"
        path="/motorcycle/add"
        exact={true}
        element={
          <RequireAuth>
            <MotorcycleAdd />
          </RequireAuth>
        }
      />
      <Route
        key="motorcycle-edit"
        path="/motorcycle/edit/:id"
        exact={true}
        element={
          <RequireAuth>
            <MotorcycleEdit />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default Routers;
