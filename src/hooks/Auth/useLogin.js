import axios from "../../services/axios";
import { useMutation } from "react-query";

export function useLogin(options = {}) {
  return useMutation((values) =>
    axios.post("/auth/login", values).then((res) => res.data)
  );
}
