import { action } from "easy-peasy";

const auth = {
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  logout: action((state, payload) => {
    localStorage.removeItem("user");
    state.user = null;
  }),
};

export default auth;
