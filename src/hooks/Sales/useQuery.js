import { useState } from "react";
import { useQuery } from "react-query";
import axios from "../../services/axios";

async function getSales(id, filter) {
  const { data } = await axios.get(`/sales/list`, {
    params: { ...filter, sortBy: "id.desc" },
  });

  return data;
}

export function useSale() {
  const [filter, filterSales] = useState({
    page: 1,
    search: null,
  });
  const [saleId, saleById] = useState(null);
  const fallback = [];
  const {
    data = fallback,
    isLoading,
    isError,
    error,
  } = useQuery(["sale", filter, saleId], async () => getSales(saleId, filter));

  return {
    data,
    isLoading,
    isError,
    error,
    filter,
    filterSales,
    saleById,
  };
}

export const fetchSale = (saleId) => {
  return axios.get(`/sales/detail/${saleId}`).then((res) => res.data);
};

export function useDetailSale(saleId) {
  return useQuery({
    queryKey: saleId && ["motorcycle", saleId],
    queryFn: (key) => fetchSale(saleId),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!saleId,
  });
}
