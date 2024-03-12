import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  TableBody,
  TableFooter,
  TablePagination,
} from '@mui/material';
import { includes } from 'lodash';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Col, Input, Row } from 'reactstrap';
// import { useTranslation } from 'react-i18next';

// import { ReactComponent as EditIcon } from '../../assets/images/edit-icon.svg';

interface BasicTableProps {
  emptyState: boolean;
  canSelectRows?: boolean;
  selectedTableRows?: any[];
  setSelectionTableRows?: Dispatch<SetStateAction<any[]>>;
  tableData: any[];
  canEditRow?: boolean;
  editRow?: (item: any) => void | false;
  tableHeadCells: any[];
  loading: boolean;
  tableCells: string[] | any[];
  id?: string;
  noPagination?: boolean;
  emptyStateString?: string;
}

export type IOrder = 'asc' | 'desc';
export type ISortHeadings = string;

export const BasicTable = (props: BasicTableProps) => {
  const {
    emptyState,
    canSelectRows,
    selectedTableRows,
    setSelectionTableRows,
    tableData,
    canEditRow,
    editRow,
    tableHeadCells,
    loading,
    tableCells,
    id,
    noPagination,
    emptyStateString,
  } = props;

  const [order, setOrder] = useState<IOrder>('asc');
  const [orderBy, setOrderBy] = useState<ISortHeadings>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const tabLocation = window.location.pathname.split('/').pop();

  //   const { t } = useTranslation();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    if (checked && !emptyState) {
      setSelectionTableRows && setSelectionTableRows(tableData);
    } else {
      setSelectionTableRows && setSelectionTableRows([]);
    }
  };

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>, row: any) => {
    const checked = event.target.checked;

    if (checked && selectedTableRows) {
      setSelectionTableRows && setSelectionTableRows([...selectedTableRows, row]);
    } else {
      setSelectionTableRows &&
        selectedTableRows &&
        setSelectionTableRows(selectedTableRows.filter(selectedRow => selectedRow !== row));
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: ISortHeadings) => {
    event.preventDefault();
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getComparator = () => {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a: any, b: any, orderBy: ISortHeadings) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  };

  useEffect(() => {
    const pageNumber = Math.floor(tableData.length / rowsPerPage) - 1;

    if (pageNumber !== -1 && !loading) {
      page > pageNumber && setPage(pageNumber);
    }
  }, [tableData]);

  return (
    <TableContainer className="items-table-container">
      {!noPagination && (
        <Row className='mb-2'>
          <Col sm={3}>
            <div className='d-flex align-items-center '>
              <div className='me-1'>Rows per Page : </div>

              <Input bsSize='sm' className='w-25' type="select" name="select" id="select" value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </Input>
            </div>
          </Col>
        </Row>
      )
      }

      <Table>

        <TableHead className="items-column-heading">

          <TableRow className="items-column-row">
            {canSelectRows && selectedTableRows && setSelectionTableRows && (
              <TableCell align="center" style={{ width: '5%' }}>
                {emptyState ? (
                  ''
                ) : (
                  <Checkbox
                    id={`${id}-select-all-checkbox`}
                    value="selectAll"
                    onChange={e => handleSelectAll(e)}
                    checked={selectedTableRows === tableData}
                  />
                )}
              </TableCell>
            )}
            <TableCell> # </TableCell>
            {tableHeadCells.map(headCell => (
              <TableCell
                key={headCell.id}
                style={headCell.style}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={e => handleRequestSort(e, headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
            {canEditRow && <TableCell id="edit" style={{ width: '5%' }}> Action</TableCell>}
          </TableRow>
        </TableHead>
        {!emptyState ? (
          <>
            <TableBody>
              {(rowsPerPage > 0
                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator())
                : tableData
              ).map((item, index) => (
                <TableRow className={includes(selectedTableRows, item) ? 'selected-table-row' : ''} key={index}>
                  {canSelectRows && selectedTableRows && setSelectionTableRows && (
                    <TableCell align="center">
                      <Checkbox
                        id={`${id}-checkbox-${index}`}
                        value={item}
                        checked={includes(selectedTableRows, item)}
                        onChange={e => handleCheckBox(e, item)}
                      />
                    </TableCell>
                  )}
                  <TableCell>{index + 1}</TableCell>
                  {tableCells.map((cellName, index) =>
                    typeof cellName === 'string' ? (
                      <TableCell data-active={item[cellName]} className={cellName} key={index}>
                        {item[cellName]}
                      </TableCell>
                    ) : (
                      <TableCell
                        data-active={item[cellName.cellName]}
                        className="clickable-data"
                        key={index}
                        onClick={e => cellName.onClick(e, item)}
                      >
                        {item[cellName.cellName]}
                      </TableCell>
                    )
                  )}
                  {canEditRow && editRow && (
                    <TableCell>
                      {/* <EditIcon onClick={() => editRow(item)} /> */}
                      <HiOutlinePencilAlt size={20} onClick={() => editRow(item)} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            {!noPagination && (
              <TableFooter>
                <TableRow>
                  <TablePagination
                    className="items-table-pagination"
                    count={tableData?.length || 0}
                    onPageChange={handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                  />
                </TableRow>
              </TableFooter>
            )}
          </>
        ) : null}
      </Table>
      {!loading && tabLocation && emptyState && emptyStateString && (
        <div className="empty-items"> {emptyStateString} </div>
      )}
      {!loading && tabLocation && emptyState && !emptyStateString && (
        <div className="empty-items">
          {('no')} {tabLocation} {('added')}
        </div>
      )}
      {loading && emptyState && <div className="empty-items">{'No Data'}...</div>}
    </TableContainer>
  );
};
