import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../../layout";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { AiOutlinePlus } from "react-icons/ai";
import { isEmpty } from "lodash";
import { HiCheckCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { toastify } from "../../../features/notification/toastify";
import { useFuelTransactionContext } from "../../../services/reducer/fuel-transaction.reducer";
import { IFuelTransactionObject } from "../../../services/tms-objects/fuel-transaction.types";
import { MdCancel } from "react-icons/md";
import { Convert } from "../../../features/shared/helper";
import { Checkbox } from "@mui/material";

const FuelTransactionPage = () => {
  const { getFuelTransactionList, fuelTransactionList, deleteFuelTransaction } = useFuelTransactionContext()
  const [filteredData, setFilteredData] = useState<IFuelTransactionObject[]>([]);
  const [filter, setFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFuelTransaction, setSelectedFuelTransaction] = useState<IFuelTransactionObject[] | []>([]);
  const [dropdownOpen,setdropdownOpen] = useState(false);
  const [iftaFilter,setIftaFilter] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    getFuelTransactionList();
  }, [])

  useEffect(() => {
    console.log(fuelTransactionList);
    if (fuelTransactionList) {
      debugger;
      setFilteredData(fuelTransactionList);
    }
  }, [fuelTransactionList])

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fuelTransactionList
    const value = e.target.value.toLowerCase();
    const filteredData = fuelTransactionList && fuelTransactionList.filter((item) => {
      return columns.some((column) =>
        String(item[column.id as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    filteredData && setFilteredData(filteredData);
  };

  const applyFilters = (ifta: number) => {
    setIftaFilter(ifta);
    let filteredList = fuelTransactionList || []; // Initialize with full list if null  
    if (ifta !== -1) {
      filteredList = filteredList.filter((item) => item.included_in_ifta === (ifta==1));
    }  
    setFilteredData(filteredList);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedFuelTransaction([]);
  };

  const handleSelectFuelTransaction = async(event: React.ChangeEvent<HTMLInputElement>,row:IFuelTransactionObject) => {
    const checked = event.target.checked;
    if (checked && selectedFuelTransaction) {
      setSelectedFuelTransaction && setSelectedFuelTransaction([...selectedFuelTransaction, row]);
    } else {
      setSelectedFuelTransaction &&
      selectedFuelTransaction &&
        setSelectedFuelTransaction(selectedFuelTransaction.filter(selectedRow => selectedRow !== row));
    }
  }

  const handleDeleteFuelCard = async () => {
    const deletedfuel_card_Ids = selectedFuelTransaction.map(doc => doc.fuel_card_id);
    await deleteFuelTransaction(deletedfuel_card_Ids).then(response => {
      response && toastify({ message: response.message, type: response.success ? "success" : "error", })
    })
    setDeleteModalOpen(false);
    setSelectedFuelTransaction([]);
  };

  const columns: CustomTableColumn[] = [
    {
      id: 'id',
      name: '',
      style: { width: '5%' },
      sortable: false,
      selector: (row: IFuelTransactionObject) => row.fuel_transaction_id,
      format:(row:IFuelTransactionObject) => (row.payment_status == 0 ? <Checkbox value="chkDelete" onChange={e => handleSelectFuelTransaction(e,row)} checked={selectedFuelTransaction.map(l=>l.fuel_transaction_id).includes(row.fuel_transaction_id)} /> : null ),
    },
    {
      id: 'fuel_transaction_date',
      name: 'DATE',
      style: { width: '25%' },
      sortable: true,
      selector: (row: IFuelTransactionObject) => row.fuel_transaction_date,
      format:(row:IFuelTransactionObject) => Convert.ToUserDate(row.fuel_transaction_date)
    },
    {
      id: 'driver_name',
      name: 'DRIVER',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IFuelTransactionObject) => row.driver_name
    },
    {
      id: 'card_number',
      name: 'FUEL CARD',
      style: { width: '15%' },
      sortable: true,
      selector: (row: IFuelTransactionObject) => row.card_number
    },
    {
      id: 'truck_name',
      name: 'TRUCK',
      style: { width: '15%' },
      sortable: true,
      selector: (row: IFuelTransactionObject) => row.truck_name
    },
    {
      id: 'location',
      name: 'LOCATION',
      style: { width: '15%' },
      sortable: true,
      selector: (row: IFuelTransactionObject) => row.location,
      format: (row: IFuelTransactionObject) => (`${row.city} ${row.state_name} ${row.zipcode}`)
    },
    {
      id: 'amount',
      name: 'FUEL AMOUNT',
      style: { width: '15%' },
      sortable: true,
      align:'right',
      selector: (row: IFuelTransactionObject) => row.amount,
      format: (row: IFuelTransactionObject) => Convert.ToUserAmount(row.amount)
    },
    {
      id: 'unit',
      name: 'FUEL UNITS, GALLONS',
      style: { width: '15%' },
      sortable: true,
      align:'right',
      selector: (row: IFuelTransactionObject) => row.unit
    },
    // {
    //   id:'notes',
    //   name:'NOTES',
    //   style: { width: '20%' },
    //   sortable:true,
    //   selector:(row:IFuelTransactionObject)=>row.notes
    // },
    {
      id: 'product_code',
      name: 'PRODUCT CODE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IFuelTransactionObject) => row.product_code
    },
    {
      id: 'included_in_ifta',
      name: 'INCLUDED IN IFTA',
      style: { width: '10%' },
      sortable: false,
      align: 'center',
      selector: (row: IFuelTransactionObject) => row.included_in_ifta,
      cell: (row: IFuelTransactionObject) => (row.included_in_ifta ? <HiCheckCircle size={20} className="text-success " /> : <MdCancel size={20} className="text-danger align-center" />)

    },
    {
      id: 'action',
      name: 'Action',
      style: { width: '5%' },
      sortable: false,
      align: 'center',
      selector: (row: IFuelTransactionObject) => row.fuel_transaction_id,
      cell: (row: IFuelTransactionObject) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewFuelTransaction}/${row.fuel_transaction_id}`) }} />
    },
  ]

  return (
    <>
      <CommonLayOut>
        <div className="d-flex justify-content-between">
          <div className="page-title">View Fuel Transaction</div>
          <div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
              <div>                
                <Dropdown isOpen={dropdownOpen} toggle={()=>setdropdownOpen(!dropdownOpen)} direction="down">
                  <DropdownToggle variant="secondary" className="bg-white" style={{border:'none', color:'#000', width:'125px'}} >
                    {iftaFilter==1? "Included In IFTA" : ( iftaFilter==0 ? "Not Included In IFTA" : "All")} ▼
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={()=>applyFilters(-1)}>All</DropdownItem>
                    <DropdownItem onClick={()=>applyFilters(1)}>Included In IFTA</DropdownItem>
                    <DropdownItem onClick={()=>applyFilters(0)}>Not Included In IFTA</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
                <InputGroup className="shadow-sm border-secondary">
                  <InputGroupText className="bg-white">
                    <BsSearch size={16} />
                  </InputGroupText>
                  <Input placeholder="Search" className="border-start-0 search" value={filter} onChange={handleSearchFilterChange} />
                </InputGroup>
              </div>
              <div className="user-info-btn-wrapper">
                {!isEmpty(selectedFuelTransaction) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>

              <Link className="btn btn-primary" to={routes.createNewFuelTransaction} ><AiOutlinePlus />  Add Fuel Transaction </Link>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No fuel transaction found." />
      </CommonLayOut>

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedFuelTransaction) && (
              <div className=" my-3 ">
                {selectedFuelTransaction.length > 1 ? (<div>You have selected {selectedFuelTransaction.length} trucks.<br /></div>) : null}
                Are you sure you want to delete?
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">  
              <Button color="danger" outline={true} className="px-4 mr-3" onClick={() => closeDeleteModal()}>Cancel</Button>
              <Button color="primary" className="px-4" onClick={() => handleDeleteFuelCard()}>Delete</Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>

    </>
  );
};

export default FuelTransactionPage;
