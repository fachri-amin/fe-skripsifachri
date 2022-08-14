/* eslint-disable jsx-a11y/anchor-is-valid */
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Table from "../components/Table";
import ModalConfirmation from "../components/ModalConfirmation";
import {
  useMotorcycle,
  useDeleteMotorcycle,
  useIncreaseStokMotorcycle,
  useDecreaseStokMotorcycle,
} from "../hooks/Motorcycle";
import { Button, Col, Row } from "react-bootstrap";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import IndeterminateCheckBoxRoundedIcon from "@mui/icons-material/IndeterminateCheckBoxRounded";
import { useStoreActions } from "easy-peasy";

const Motorcycle = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, isLoading, filter, filterMotorcycles } = useMotorcycle();
  const navigate = useNavigate();
  const { mutate: deleteMotorcycle } = useDeleteMotorcycle();
  const { mutate: increaseStokMotorcycle } = useIncreaseStokMotorcycle();
  const { mutate: decreaseStokMotorcycle } = useDecreaseStokMotorcycle();
  const [deleteId, setDeleteId] = useState(false);
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
        Header: "Stok",
        accessor: "stok",
        Cell: ({ row }) => {
          return (
            <>
              {row.values.stok}
              <div className="d-inline ms-2">
                <AddBoxRoundedIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => increaseStokMotorcycle(row.original.id)}
                />
                {row.values.stok > 0 && (
                  <IndeterminateCheckBoxRoundedIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => decreaseStokMotorcycle(row.original.id)}
                  />
                )}
              </div>
            </>
          );
        },
      },
      {
        Header: "Aksi",
        accessor: "id",
        Cell: ({ row }) => (
          <>
            <a
              className="text-orange wait-pay btn btn-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/motorcycle/edit/${row.values.id}`)}
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
              onClick={() => navigate("/motorcycle/add", { replace: true })}
            >
              Tambah Sepeda Motor
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
