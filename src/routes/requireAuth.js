import { Navigate } from "react-router-dom";
import { useStoreState, useStoreActions } from "easy-peasy";

function RequireAuth({ children }) {
  const setUser = useStoreActions((actions) => actions.setUser);
  let user = useStoreState((state) => state.user);

  if (!user && localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }

  const authed = user?.token || undefined;

  return authed ? children : <Navigate to="/auth/login" replace />;
}

export default RequireAuth;
