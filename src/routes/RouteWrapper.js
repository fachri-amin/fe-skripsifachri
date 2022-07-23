import { Route, Navigate, useLocation } from "react-router-dom";
// import PropTypes from "prop-types";
import { useStoreState } from "easy-peasy";

const adminBlackListRoute = ["/auth/login"];

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const user = useStoreState((state) => state.user);
  const persistedUser = { ...user, token: user.token };

  const signed = persistedUser.token || undefined;
  const location = useLocation();
  const { pathname } = location;

  /**
   * Navigate user to signIn pages if he tries to access a private      route
   * without emailAuth.
   */

  if (isPrivate && !signed) {
    return <Navigate to="/auth/login" replace={true} />;
  }

  /**
   * Navigate user to Main pages if he tries to access a non private route
   * (signIn or SignUp) after being authenticated.
   */
  if (adminBlackListRoute.includes(pathname) && signed) {
    return <Navigate to="/" replace={true} />;
  }

  /**
   * If not included on both previous cases, Navigate user to the desired route.
   */
  return <Route {...rest} element={Component} />;
}

// RouteWrapper.propTypes = {
//   isPrivate: PropTypes.bool,
//   component: PropTypes.func.isRequired,
//   rest: PropTypes.object,
// };
// RouteWrapper.defaultProps = {
//   isPrivate: false,
//   rest: {},
// };
