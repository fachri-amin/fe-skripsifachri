import Pagination from "react-bootstrap/Pagination";
// import "bootstrap/dist/css/bootstrap.min.css";

const SimplePagination = ({
  onPrevClick,
  onNextClick,
  disabledPrev,
  disabledNext,
}) => {
  return (
    <Pagination size="lg">
      <Pagination.Prev onClick={onPrevClick} disabled={disabledPrev} />
      <Pagination.Next onClick={onNextClick} disabled={disabledNext} />
    </Pagination>
  );
};

export default SimplePagination;
