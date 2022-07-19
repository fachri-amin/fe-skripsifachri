import { action } from "easy-peasy";

const auth = {
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
};

export default auth;
