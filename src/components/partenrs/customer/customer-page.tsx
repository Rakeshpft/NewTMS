import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../../layout";
import { useCustomerContext } from "../../../services/reducer/customer.reducer";
import { AiOutlinePlus } from "react-icons/ai";
import { ICustomerDetails, ICustomerFilter } from "../../../services/tms-objects/customer.types";
import { isEmpty } from "lodash";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { routes } from "../../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { toastify } from "../../../features/notification/toastify";
import { PhoneMask } from "../../../features/shared/validate";
import { LoadingContext } from "../../../services/context/loading.context";

const CustomerPage = () => {
  const { getCustomerDetails, CustomerDetails, deleteCustomer } = useCustomerContext();
  const { setLoader } = useContext(LoadingContext);

  const [filteredData, setFilteredData] = useState<ICustomerDetails[] | []>([]);
  const [customerType, setCustomerType] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const [selectedCustomers, setSelectedCustomers] = useState<ICustomerDetails[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (CustomerDetails) {
      setFilteredData(CustomerDetails);
    }
  }, [CustomerDetails]);

  useEffect(() => {
    let filter: ICustomerFilter = { is_broker: customerType == 1, is_shipper_receiver: customerType == 2 };
    getCustomerDetails(filter);
  }, [customerType])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    CustomerDetails
      const value = e.target.value.toLowerCase();
      const filteredData = CustomerDetails && CustomerDetails.filter((item) => {
        return columns.some((column) =>
          String(item[column.id as keyof object])
            .toLowerCase()
            .includes(value)
        );
      });
      setFilter(value);
      filteredData && setFilteredData(filteredData);
    };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCustomers([]);
  };

  const handleChangeCustomerTab = (tabId: number) => {
    setCustomerType(tabId);
  };

  const handleDeleteCustomers = async () => {
    const deletedCustomerIds = selectedCustomers.map(doc => doc.customer_id);
    setLoader(true);
    await deleteCustomer(deletedCustomerIds)
      .then(response => {
        console.log(response);
        response && toastify({ message: response.message, type: response.success ? "success" : "error", })
        let filter: ICustomerFilter = { is_broker: customerType == 1, is_shipper_receiver: customerType == 2 };
        getCustomerDetails(filter);
        setLoader(false);
    })
    setDeleteModalOpen(false)    
    setSelectedCustomers([]);
  }  

  const columns: CustomTableColumn[] = [
    {
      id: "full_name",
      name: "NAME",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.full_name,
    },
    {
      id: "address",
      name: "ADDRESS",
      style: { width: "25%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.address,
    },
    {
      id: "phone",
      name: "PHONE",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.phone,      
      format:(row:ICustomerDetails)=> PhoneMask(row.phone)
    },
    {
      id: "mc_number",
      name: "MC",
      style: { width: "5%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.mc_number
    },
    {
      id: "billing_type_name",
      name: "PAY METHOD",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.billing_type_name
    },
    {
      id: "credit_name",
      name: "CREDIT",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.credit_name
    },
    // {
    //   id: "avg_days_to_pay",
    //   name: "AVG. DTP",
    //   style: { width: "10%" },
    //   sortable: true,
    //   selector: (row: ICustomerDetails) => row.avg_days_to_pay
    // },
    {
      id: "status_name",
      name: "STATUS",
      style: { width: "5%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.status_name
    },
    {
      id: "action",
      name: "ACTION",
      style: { width: "5%" },
      sortable: false,
      selector: (row: ICustomerDetails) => row.customer_id,
      cell: (row: ICustomerDetails) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewCustomer}/${row.customer_id}`) }} />
    }
  ]
  return (
    <>
      <CommonLayOut>
        <div className=" d-flex justify-content-between">
          <div className="page-title">Customers</div>
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
                    value={filter}
                    onChange={handleSearch}
                  />
                </InputGroup>
              </div>
              <div className="user-info-btn-wrapper">
                {!isEmpty(selectedCustomers) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
              <Link to={routes.createNewCustomer}>
                <Button color="primary" >
                  <AiOutlinePlus />
                  New Customer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      <div>
      <Nav tabs>
        <NavItem>
          <NavLink className={customerType == 1 ? "active" : ""} onClick={() => handleChangeCustomerTab(1)}>
              Broker
           </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={customerType == 2 ? "active" : ""} onClick={() => handleChangeCustomerTab(2)}>
              Shipper/Receiver
          </NavLink>
        </NavItem>
      </Nav>
          {
            {
              1: <CustomTable columns={columns} data={filteredData} noRecordMessage="No customer found." canSelectRows={true} selectedTableRows={selectedCustomers} setSelectionTableRows={setSelectedCustomers} />,
              2: <CustomTable columns={columns} data={filteredData} noRecordMessage="No customer found." canSelectRows={true} selectedTableRows={selectedCustomers} setSelectionTableRows={setSelectedCustomers} />,
            }[customerType]
          }  
        </div>
      </CommonLayOut>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete Customer</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedCustomers) && (
              <div className=" my-3 ">
                {selectedCustomers.length > 1?(<div>You have selected {selectedCustomers.length} customers.<br /></div>):null}
                Are you sure you want to delete?
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3" onClick={() => closeDeleteModal()}>
                  Cancel
              </Button>
              <Button color="primary" className="px-4" onClick={() => handleDeleteCustomers()}>
                Delete
              </Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default CustomerPage;
