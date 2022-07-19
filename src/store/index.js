import { createStore } from "easy-peasy";

import auth from "./states/auth";

export const store = createStore({
  auth,
});
