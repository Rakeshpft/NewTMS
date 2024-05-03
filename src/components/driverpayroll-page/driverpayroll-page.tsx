import React, { useContext, useEffect, useState } from 'react'
import { ISettlementObject } from '../../services/tms-objects/driverPayroll.types'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../routes/routes'
import {  isEmpty } from 'lodash'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { InputGroup, InputGroupText, Input, Button, Modal, ModalHeader, ModalBody, Container, FormGroup } from 'reactstrap'
import CommonLayOut from '../../layout'
import { CustomTable } from '../../features/data-table/CustomTable'
import { Convert } from '../../features/shared/helper'
import { useDriverPayrollContext } from '../../services/reducer/driverPayroll.reducer'
import { toastify } from '../../features/notification/toastify'
import { LoadingContext } from '../../services/context/loading.context'
import { Checkbox } from '@mui/material'

const Driverpayroll = () => {
  const navigate = useNavigate()  
  const { getSettlementList, settlementList, deleteDriverPayroll } = useDriverPayrollContext();
  const { setLoader } = useContext(LoadingContext);
  const [filter, setFilter] = useState("");

  const [filteredData, setFilteredData] = useState<ISettlementObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDriverPayrolls, setSelectedDriverPayrolls] = useState<ISettlementObject[] | []>([]);

  useEffect(()=>{
    getSettlementList();
  },[]);

  useEffect(() => {
    if (settlementList) {
      setFilteredData(settlementList);
    }
  }, [settlementList]);
  const handleSelectSettlement = async(event: React.ChangeEvent<HTMLInputElement>,row:ISettlementObject) => {
    const checked = event.target.checked;
    if (checked && selectedDriverPayrolls) {
      selectedDriverPayrolls && setSelectedDriverPayrolls([...selectedDriverPayrolls, row]);
    } else {
      setSelectedDriverPayrolls &&
      selectedDriverPayrolls &&
      setSelectedDriverPayrolls(selectedDriverPayrolls.filter(selectedRow => selectedRow !== row));
    }
  }

  const columns: CustomTableColumn[] = [
    {
      id: 'id',
      name: '',
      style: { width: '5%' },
      sortable: false,
      selector: (row: ISettlementObject) => row.settlement_id,
      format:(row:ISettlementObject) => (row.payment_status_id == 0 ? <Checkbox value="chkDelete" onChange={e => handleSelectSettlement(e,row)} checked={selectedDriverPayrolls.map(l=>l.settlement_id).includes(row.settlement_id)} /> : null ),
    },
    {
      id: "date",
      name: "DATE",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ISettlementObject) => row.created_date,
      format: (row: ISettlementObject) =>  Convert.ToUserDate(row.created_date)
    },
    {
      id: "settlement_number",
      name: "SETTLEMENT NO.",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ISettlementObject) => row.settlement_number
    },
    {
      id: "vendor_name",
      name: "PAYABLE TO",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ISettlementObject) => (row.vendor_id>0? row.vendor_name:row.driver_name),
    },
    {
      id: "driver_name",
      name: "DRIVER",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ISettlementObject) => row.driver_name
    },
    {
      id: "total_amount",
      name: "SETTLEMENT TOTAL",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ISettlementObject) => row.total_amount,
      format:(row: ISettlementObject) => Convert.ToUserAmount(row.total_amount)
    },
    {
      id: "paid_amount",
      name: "BALANCE DUE",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ISettlementObject) => (row.total_amount - row.paid_amount),
      format: (row: ISettlementObject) => Convert.ToUserAmount(row.total_amount - row.paid_amount),
    },
  
    {
      id: "payment_status_id",
      name: "STATUS",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ISettlementObject) => row.payment_status_id,
      cell:(row:ISettlementObject)=>(row.payment_status_id ==0 ? "Pending":"Paid")
    },
    {
      id: "action",
      name: "ACTION",
      style: { width: "5%" },
      sortable: false,
      align:'center',
      selector: (row: ISettlementObject) => row.settlement_id,
      cell: (row: ISettlementObject) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewDriverPayRoll}/${row.settlement_id}`) }} />
    }
  ]

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDriverPayrolls([]);
  };

  const handleDeletePayroll = async () => {
  
  
   
      const deletedDriverPayrollIds = selectedDriverPayrolls.map(payroll => payroll.settlement_id);
      
      setLoader(true);
      await deleteDriverPayroll(deletedDriverPayrollIds)
        .then(response => {
          console.log(response);
          response &&
            toastify({
              message: response.message,
              type: response.success ? "success" : "error",
            });
            setLoader(false);
        });
  
      setDeleteModalOpen(false);
      setSelectedDriverPayrolls([]);
    
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    settlementList
      const value = e.target.value.toLowerCase();
      const filteredData = settlementList && settlementList.filter((item) => {
        return columns.some((column) =>
          String(item[column.id as keyof object])
            .toLowerCase()
            .includes(value)
        );
      });
      setFilter(value);
      filteredData && setFilteredData(filteredData);
    };
  
  return (
    <>
      <CommonLayOut>
        <div className=" d-flex justify-content-between">
          <div className="page-title">Driver Payroll</div>
          <div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
                <InputGroup className="shadow-sm border-secondary">
                  <InputGroupText className="bg-white">
                    <BsSearch size={16} />
                  </InputGroupText>
                  <Input placeholder="Search" className="border-start-0 search"
                   value={filter} onChange={handleSearch}
                  />
                </InputGroup>
              </div>

              <div className="user-info-btn-wrapper">
                {!isEmpty(selectedDriverPayrolls) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
              <Link to={routes.createNewDriverPayRoll}>
                <Button color="primary" >
                  <AiOutlinePlus />
                  New Settlement
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No Payrolls found." selectedTableRows={selectedDriverPayrolls} setSelectionTableRows={setSelectedDriverPayrolls} />        
      </CommonLayOut>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedDriverPayrolls) && (
              <div className=" my-3 ">
                {selectedDriverPayrolls.length > 1
                  ? `Are you sure you want to delete ${selectedDriverPayrolls.length} payrolls?`
                  : `Are you sure you want to delete the "${selectedDriverPayrolls[0].driver_name}"?`}
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button
                color="primary"
                className="px-4 mr-3 shadow save-button  "
                onClick={() => closeDeleteModal()}
              >
                Cancel
              </Button>

              <Button
                color="primary"
                className="px-4  shadow save-button "
                onClick={() => handleDeletePayroll()}
              >
                Delete
              </Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>

    </>
  );
}

export default Driverpayroll