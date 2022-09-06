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

async function getMotorcycleOptions(id, filter) {
  const { data } = await axios.get(`/sales/motorcycle/option`, {
    params: { ...filter, sortBy: "id.desc" },
  });

  return data;
}

export function useMotorcycleOptions() {
  const [filter, filterMotorcycles] = useState({
    page: 1,
    search: null,
  });
  const [motorcycleId, motorcycleById] = useState(null);
  const fallback = [];
  let {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery(["motorcycleOption", filter, motorcycleId], async () =>
    getMotorcycleOptions(motorcycleId, filter)
  );

  data = data?.data?.results.map((item) => ({ label: item.nama, value: item }));

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

export const fetchMotorcycle = (motorcycleId) => {
  return axios
    .get(`/sales/motorcycle/detail/${motorcycleId}`)
    .then((res) => res.data);
};

export function useDetailMotorcycle(motorcycleId) {
  return useQuery({
    queryKey: motorcycleId && ["motorcycle", motorcycleId],
    queryFn: (key) => fetchMotorcycle(motorcycleId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!motorcycleId,
  });
}
