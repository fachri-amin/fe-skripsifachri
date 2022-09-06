import axios from "../../services/axios";
import { useMutation, useQueryClient } from "react-query";

export function useAddSale(options = {}) {
  return useMutation((values) =>
    axios.post("/sales/create", values).then((res) => res.data)
  );
}
export function useEditSale(id, options = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    (formData) =>
      axios.put(`/sales/edit/${id}`, formData).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sale");
        queryClient.removeQueries("sale");
      },
    }
  );
}

export function useDeleteSale(options = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    (id) => axios.delete(`/sales/delete/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("sale");
        queryClient.removeQueries("sale");
      },
    }
  );
}
