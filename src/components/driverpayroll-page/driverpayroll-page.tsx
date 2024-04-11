import React, { useState } from 'react'
import { IDriverPayrollObject } from '../../services/tms-objects/driverPayroll.types'
import moment from 'moment'
import { HiCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi'
import { MdCancel } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { routes } from '../routes/routes'
import { isEmpty } from 'lodash'
import { AiOutlinePlus } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { InputGroup, InputGroupText, Input, Button, Modal, ModalHeader, ModalBody, Container, FormGroup } from 'reactstrap'
import CommonLayOut from '../../layout'
import { CustomTable } from '../../features/data-table/CustomTable'

const Driverpayroll = () => {

  const navigate = useNavigate()

  
  // const inputRef = useRef<HTMLInputElement>(null);

  const [filteredData] = useState<IDriverPayrollObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  const [selectedDriverPayrolls, setSelectedDriverPayrolls] = useState<IDriverPayrollObject[] | []>([]);

  const columns: CustomTableColumn[] = [
    {
      id: "date",
      name: "DATE",
      style: { width: "15%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.date,
      format: (row: IDriverPayrollObject) =>  moment(row.date).format('L')
    },
    {
      id: "payable_to",
      name: "PAYABLE TO",
      style: { width: "15%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.payable_to,
    },
    {
      id: "driver_id",
      name: "DRIVER",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.driver_name
    },
    {
      id: "settlement_total",
      name: "SETTLEMENT TOTAL",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.settlement_total
    },
    {
      id: "balance_due",
      name: "BALANCE DUE",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.balance_due
    },
    {
      id: "email",
      name: "EMAIL",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.email,
     

    },
    {
      id: "is_active",
      name: "STATUS",
      style: { width: "5%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.is_active,
      cell:(row:IDriverPayrollObject)=>(row.is_active ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },

    {
      id: "notes",
      name: "NOTES",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: IDriverPayrollObject) => row.notes
    },

    {
      id: "action",
      name: "ACTION",
      style: { width: "5%" },
      sortable: false,
      selector: (row: IDriverPayrollObject) => row.driver_payroll_id,
      cell: (row: IDriverPayrollObject) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewDriverPayRoll}/${row.driver_payroll_id}`) }} />
    }
  ]
  function closeDeleteModal(): void {
    throw new Error('Function not implemented.')
  }

  function handleDeletePayrolls(): void {
    throw new Error('Function not implemented.')
  }

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
                  <Input
                    placeholder="Search"
                    className="border-start-0 search"
                    // inputRef={} onChange={(e: any) =>
                    //   handleSearch(e.target.value)}
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
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No Payrolls found." canSelectRows={true} selectedTableRows={selectedDriverPayrolls} setSelectionTableRows={setSelectedDriverPayrolls} />
      </CommonLayOut>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold"> Delete </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedDriverPayrolls) && (
              <div className=" my-3 ">
                {selectedDriverPayrolls.length > 1
                  ? `Are you sure you want to delete ${selectedDriverPayrolls.length} trucks?`
                  : `Are you sure you want to delete customer "${selectedDriverPayrolls[0].driver_name}"?`}
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
                onClick={() => handleDeletePayrolls()}
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