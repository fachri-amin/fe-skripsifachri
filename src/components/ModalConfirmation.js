import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalConfirmation = ({
  title,
  bodyText,
  show,
  handleClose,
  handleReject,
  handleAccept,
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReject}>
          Tidak
        </Button>
        <Button className="btn-primary" onClick={handleAccept}>
          Ya
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmation;
