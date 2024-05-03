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
  TablePagination,
  TableFooter,
} from '@mui/material';
import { includes } from 'lodash';
import { Col, Input, Row } from 'reactstrap';

interface TableProps {
  id?: string;
  columns: CustomTableColumn[];
  data: any[];
  footerData?:any[];
  noRecordMessage?:string  
  canSelectRows?: boolean;
  selectedTableRows?: any[];
  setSelectionTableRows?: Dispatch<SetStateAction<any[]>>;
  loading?: boolean;
  pagination?: boolean;
  paginationServer?: boolean;
}

export type IOrder = 'asc' | 'desc';
export type ISortHeadings = string;

export const CustomTable = (props: TableProps) => {
  const {
    id,
    columns,
    data,
    footerData,
    noRecordMessage='',
    canSelectRows,
    selectedTableRows,
    setSelectionTableRows,
    loading,
    pagination=true,
    paginationServer,
  } = props;

  const [order, setOrder] = useState<IOrder>('asc');
  const [orderBy, setOrderBy] = useState<ISortHeadings>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //const tabLocation = window.location.pathname.split('/').pop();
  //   const { t } = useTranslation();

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    if (checked && data) {
      setSelectionTableRows && setSelectionTableRows(data);
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
    const isAsc = orderBy !== property ? false : orderBy === property && order === 'asc';
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
    const pageNumber = Math.floor(data.length / rowsPerPage) - 1;
    if (pageNumber !== -1 && !loading) {
      page > pageNumber && setPage(pageNumber);
    }
  }, [data]);
  

  return (
    <>
    <TableContainer className="items-table-container">
      {pagination && (
        <Row className='mb-2'>
          <Col sm={3}>
            <div className='d-flex align-items-center small'>
              <div className='me-2'>Show Entries : </div>
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
                  <Checkbox
                    id={`${id}-select-all-checkbox`}
                    value="selectAll"
                    onChange={e => handleSelectAll(e)}
                    checked={selectedTableRows === data}
                  />                
              </TableCell>
            )}
            {/* <TableCell> # </TableCell> */}
            {columns.map(column => (
              <TableCell
                key={column.id}
                style={column.style}
                sortDirection={orderBy === column.id ? order : false}
                align={column.align?column.align:'left'}
              >
                {column.sortable ?
                (<TableSortLabel active={orderBy === column.id} direction={orderBy === column.id ? order : 'asc'} onClick={e => handleRequestSort(e, column.id)}>
                {column.headCell ? column.headCell : column.name}
                </TableSortLabel>):(column.headCell ? column.headCell : column.name)}
              </TableCell>
            ))}            
          </TableRow>
        </TableHead>
        {(
          <>
            <TableBody>
              {data && data.length>0 && !loading ? (
                (rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort(getComparator())
                : data
              ).map((row, index) => (
                <TableRow className={includes(selectedTableRows, row) ? 'selected-table-row' : ''} key={index}>
                  {canSelectRows && selectedTableRows && setSelectionTableRows && (
                    <TableCell align="center">
                      <Checkbox
                        id={`${id}-checkbox-${index}`}
                        value={row}
                        checked={includes(selectedTableRows, row)}
                        onChange={e => handleCheckBox(e, row)}
                      />
                    </TableCell>
                  )}
                  {/* <TableCell>{index + 1}</TableCell> */}
                  {columns.map((column, index) =>
                    <TableCell data-active={column} className={column.id} key={index} align={column.align?column.align:'left'}>
                      {column.cell ? column.cell(row) :(column.format ? column.format(row): column.selector(row))}
                    </TableCell>                  
                  )}
                </TableRow>
              ))): (
                <TableRow>
                  <TableCell className='text-center' colSpan={columns.length+(canSelectRows?1:0)}>
                      {loading?'Processing...':(noRecordMessage==''?'No record found.':noRecordMessage)}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          {footerData && footerData.length>0 &&
            <TableFooter>
            {!loading && footerData.map((row, index) => (
              <TableRow key={index}>
                {canSelectRows && selectedTableRows && setSelectionTableRows && (
                  <TableCell align="center" style={{ width: '5%' }}></TableCell>)}
                    {columns.map(column => (
                      <TableCell key={column.id} align={column.align?column.align:'left'}>
                        {column.footCell ? column.footCell(row) : column.selector(row)}
                      </TableCell>
                    ))}            
              </TableRow>
            ))}
          </TableFooter>   
          }               
          </>
        )}
      </Table>      
    </TableContainer>
      {data && data.length>0 && pagination && (
                  <TablePagination
                    className="items-table-pagination"
                    count={paginationServer?-1 :(data?.length || 0)}
                    onPageChange={handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    showFirstButton={true}
                    showLastButton={true}
                  />
      )}
      </>
  );
};
