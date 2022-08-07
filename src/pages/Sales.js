/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Table from "../components/Table";
import { useSale } from "../hooks/Sales";

const Sales = () => {
  const { data, isLoading, filter, filterSales } = useSale();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "idSerial",
      },
      {
        Header: "Nama Sepeda Motor",
        accessor: "motor_detail.nama",
      },
      {
        Header: "Tahun",
        accessor: "tahun",
      },
      {
        Header: "Harga Baru",
        accessor: "harga_baru",
      },
      {
        Header: "Harga Bekas",
        accessor: "harga_bekas",
      },
      {
        Header: "Tanggal Jual",
        accessor: "created_at",
        Cell: ({ row }) => <>{row.values.created_at.split("T")[0]}</>,
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: ({ row }) => (
          <>
            <a
              className="text-orange wait-pay"
              style={{ cursor: "pointer" }}
              onClick={() => navigate.push(`/`)}
            >
              add
            </a>
            <a
              className={"text-orange wait-pay ms-3"}
              style={{ cursor: "pointer" }}
              title={
                !row.original.can_delete &&
                "Data tidak dapat dihapus karena sudah digunakan"
              }
              onClick={() => {
                console.log("delete");
              }}
            >
              delete
            </a>
          </>
        ),
      },
    ],
    []
  );

  const dataWithIDSerial =
    data?.data?.results?.map((item, index) => ({
      ...item,
      idSerial: (filter?.page - 1) * 10 + index + 1,
    })) || [];

  return (
    <MainLayout title={"Sepeda Motor"}>
      <Table
        columns={columns}
        data={dataWithIDSerial}
        disabledNext={!data?.data?.next}
        disabledPrev={!data?.data?.previous}
        onNextClick={() => {
          filterSales({
            ...filter,
            page: filter?.page + 1,
          });
        }}
        onPrevClick={() => {
          filterSales({
            ...filter,
            page: filter?.page - 1,
          });
        }}
      />
    </MainLayout>
  );
};

export default Sales;
