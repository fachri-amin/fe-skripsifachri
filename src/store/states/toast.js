import { action } from "easy-peasy";

const toast = {
  successToast: null,
  setSuccessToast: action((state, payload) => {
    state.successToast = payload;
  }),
  errorToast: null,
  setErrorToast: action((state, payload) => {
    state.errorToast = payload;
  }),
};

export default toast;
