import React, { useState } from "react";
import {
  Pagination as BootstrapPagination,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  PaginationItem,
  PaginationLink,
  Table,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { BsSortDown, BsSortUp } from "react-icons/bs";
// import { FaRegEdit } from "react-icons/fa";
import { PiGearDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { HiOutlinePencilAlt } from "react-icons/hi";
interface TableProps<T> {
  tableData: any[];
  tableHeaders: any[];
  defaultSortColumn: keyof T;
  canEditRow?: boolean;
  editRow?: (row: any) => void;
}

function GenericTable<T>({
  tableData,
  tableHeaders,
  defaultSortColumn,
  canEditRow,
  editRow,
}: TableProps<T>) {
  const itemsPerPage = 10;
  const [sortColumn, setSortColumn] = useState<keyof T>(defaultSortColumn);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = tableData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...tableData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) {
      return sortDirection === "asc" ? -1 : 1;
    } else if (aValue > bValue) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <div>
        <Table responsive hover className="table-data text-nowrap">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>
                  {header}
                  <span
                    className="text-dark ps-1"
                    onClick={() => handleSort(header)}
                    style={{ cursor: "pointer" }}
                  >
                    {sortDirection === "asc" ? <BsSortUp /> : <BsSortDown />}
                  </span>
                </th>
              ))}
              {canEditRow && (
                <>
                <th id="edit">
                 
                  Actions 
                </th>
                <th>
                <PiGearDuotone />
                </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.length !== 0 ? (
              <>
                {sortedData.slice(startIndex, endIndex).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {tableHeaders.map((header, headerIndex) =>
                      editRow && (header === "Load" || header === "Broker") ? (
                        <td key={headerIndex}>
                          {" "}
                          <Link onClick={() => editRow(row)} to={""}>
                            {" "}
                            {row[header]}
                          </Link>
                        </td>
                      ) : (
                        <td key={headerIndex}>{row[header]}</td>
                      )
                    )}

                    {canEditRow && editRow && (
                      <>
                      <td>
                        {/* <FaRegEdit
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#8FF086",
                          }}
                          onClick={() => editRow(row)}
                        /> */}
                        <div role="button" onClick={() => editRow(row)}>
                          <HiOutlinePencilAlt />
                        </div>

                      </td>
                      <td>
                      <UncontrolledButtonDropdown>
                      <DropdownToggle
              caret
              id="userProfileDropdown"
              color="transparent"
              className="user-dropdown__icon d-flex align-items-center" 
            >
               <DropdownMenu>
                <DropdownItem >
                <div className="d-flex justify-content-between text-align-center">
                  <span className="text-dark" >Edit</span>
                </div>
                </DropdownItem>
                <DropdownItem>
                <div className="d-flex justify-content-between text-align-center">
                  <span className="text-dark" >Delete</span>
                </div>
                </DropdownItem>
                <DropdownItem>
                <div className="d-flex justify-content-between text-align-center">
                  <span className="text-dark" >Resend Invitation</span>
                </div>
                </DropdownItem>
                
               </DropdownMenu>
              </DropdownToggle>

                        
                      </UncontrolledButtonDropdown>

                      </td>
                      </>

                    )}
                  </tr>
                ))}
              </>
            ) : (
              <>
                <div className="text-align-center fw-bold">
                  No data available
                </div>
              </>
            )}
          </tbody>
        </Table>
        <div>
          <BootstrapPagination size="sm">
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink
                previous
                onClick={() => handlePageClick(currentPage - 1)}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i} active={i + 1 === currentPage}>
                <PaginationLink onClick={() => handlePageClick(i + 1)}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink
                next
                onClick={() => handlePageClick(currentPage + 1)}
              />
            </PaginationItem>
            <div className="data-count">
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </div>
          </BootstrapPagination>
        </div>
      </div>
    </>
  );
}

export default GenericTable;
