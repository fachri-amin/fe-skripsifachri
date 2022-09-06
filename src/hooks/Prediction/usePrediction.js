import axios from "../../services/axios";
import { useMutation } from "react-query";

export function usePrediction(options = {}) {
  return useMutation((values) =>
    axios.post("/predictor/get-prediction", values).then((res) => res.data)
  );
}
