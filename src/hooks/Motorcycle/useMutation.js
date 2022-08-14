import axios from "../../services/axios";
import { useMutation, useQueryClient } from "react-query";

export function useAddMotorcycle(options = {}) {
  return useMutation((values) =>
    axios.post("/sales/motorcycle/create", values).then((res) => res.data)
  );
}
export function useEditMotorcycle(id, options = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    (formData) =>
      axios
        .put(`/sales/motorcycle/edit/${id}`, formData)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motorcycle");
        queryClient.removeQueries("motorcycle");
      },
    }
  );
}

export function useDeleteMotorcycle(options = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    (id) =>
      axios.delete(`/sales/motorcycle/delete/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motorcycle");
        queryClient.removeQueries("motorcycle");
      },
    }
  );
}

export function useIncreaseStokMotorcycle(options = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    (id) =>
      axios
        .put(`/sales/motorcycle/increase-stok/${id}`)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motorcycle");
        queryClient.removeQueries("motorcycle");
      },
    }
  );
}

export function useDecreaseStokMotorcycle(options = {}) {
  const queryClient = useQueryClient();

  return useMutation(
    (id) =>
      axios
        .put(`/sales/motorcycle/decrease-stok/${id}`)
        .then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("motorcycle");
        queryClient.removeQueries("motorcycle");
      },
    }
  );
}
