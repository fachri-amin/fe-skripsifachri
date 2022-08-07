import { useTable } from "react-table";
import SimplePagination from "./SimplePagination";
import "bootstrap/dist/css/bootstrap.min.css";

function Table({
  columns,
  data,
  onNextClick,
  onPrevClick,
  disabledPrev,
  disabledNext,
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead className="table-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="w-100 d-flex justify-content-end">
        <SimplePagination
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
          disabledNext={disabledNext}
          disabledPrev={disabledPrev}
        />
      </div>
    </>
  );
}

export default Table;
