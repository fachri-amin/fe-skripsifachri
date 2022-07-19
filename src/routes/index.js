import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
    </Routes>
  );
};

export default Routers;
