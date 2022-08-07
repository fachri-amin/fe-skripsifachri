/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Table from "../components/Table";
import { useMotorcycle } from "../hooks/Motorcycle";

const Motorcycle = () => {
  const { data, isLoading, filter, filterMotorcycles } = useMotorcycle();
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "idSerial",
      },
      {
        Header: "Nama Sepeda Motor",
        accessor: "nama",
      },
      {
        Header: "Merk",
        accessor: "merk",
      },
      {
        Header: "Volume Silinder",
        accessor: "volume_silinder",
      },
      {
        Header: "Jumlah Silinder",
        accessor: "jumlah_silinder",
      },
      {
        Header: "Transmisi",
        accessor: "transmisi",
      },
      {
        Header: "Jenis",
        accessor: "jenis",
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
          filterMotorcycles({
            ...filter,
            page: filter?.page + 1,
          });
        }}
        onPrevClick={() => {
          filterMotorcycles({
            ...filter,
            page: filter?.page - 1,
          });
        }}
      />
    </MainLayout>
  );
};

export default Motorcycle;
