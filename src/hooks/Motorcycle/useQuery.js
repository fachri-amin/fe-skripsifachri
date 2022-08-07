import { useState } from "react";
import { useQuery } from "react-query";
import axios from "../../services/axios";

async function getMotorcycles(id, filter) {
  const { data } = await axios.get(`/sales/motorcycle/list`, {
    params: { ...filter, sortBy: "id.desc" },
  });

  return data;
}

export function useMotorcycle() {
  const [filter, filterMotorcycles] = useState({
    page: 1,
    search: null,
  });
  const [motorcycleId, motorcycleById] = useState(null);
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery(["motorcycle", filter, motorcycleId], async () =>
    getMotorcycles(motorcycleId, filter)
  );

  return {
    data,
    isLoading,
    isError,
    error,
    filter,
    filterMotorcycles,
    motorcycleById,
  };
}
