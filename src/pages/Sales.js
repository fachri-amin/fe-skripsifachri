/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Table from "../components/Table";
import { useSale, useDeleteSale } from "../hooks/Sales";
import ModalConfirmation from "../components/ModalConfirmation";
import { Button, Col, Row } from "react-bootstrap";
import { useStoreActions } from "easy-peasy";

const Sales = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const { data, isLoading, filter, filterSales } = useSale();
  const { mutate: deleteMotorcycle } = useDeleteSale();
  const navigate = useNavigate();
  const setSuccessToast = useStoreActions((actions) => actions.setSuccessToast);
  const setErrorToast = useStoreActions((actions) => actions.setErrorToast);

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
        Cell: ({ row }) => {
          return (
            <>
              <a
                className="text-orange wait-pay btn btn-secondary"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/sales/edit/${row.values.id}`)}
              >
                Edit
              </a>
              <a
                className={"text-orange wait-pay ms-3 btn btn-danger"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setDeleteId(row.values.id);
                  setShowDeleteModal(true);
                }}
              >
                delete
              </a>
            </>
          );
        },
      },
    ],
    []
  );

  const dataWithIDSerial =
    data?.data?.results?.map((item, index) => ({
      ...item,
      idSerial: (filter?.page - 1) * 10 + index + 1,
    })) || [];

  const handleDeleteData = () => {
    deleteMotorcycle(deleteId, {
      onSuccess: (res) => {
        window.scrollTo(0, 0);
        setShowDeleteModal(false);
        setDeleteId(null);
        setSuccessToast(res.message);
      },
      onError: (res) => {
        setErrorToast(res.message);
      },
    });
  };

  return (
    <MainLayout title={"Sepeda Motor"}>
      <ModalConfirmation
        title={"Konfirmasi Hapus Sepeda Motor"}
        bodyText={"Ingin menghapus data sepeda motor ini?"}
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleReject={() => setShowDeleteModal(false)}
        handleAccept={handleDeleteData}
      />
      <Row className="justify-content-end mb-4">
        <Col lg={3}>
          <div className="d-grid gap-2 pt-4">
            <Button
              variant="primary"
              size="lg"
              type="button"
              onClick={() => navigate("/sales/add", { replace: true })}
            >
              Tambah Penjualan
            </Button>
          </div>
        </Col>
      </Row>
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
