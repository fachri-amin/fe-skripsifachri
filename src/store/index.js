import { createStore } from "easy-peasy";

import auth from "./states/auth";
import toast from "./states/toast";

export const store = createStore({
  ...auth,
  ...toast,
});
