import React, { useEffect, useRef, useState } from "react";
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

  TabPane,
} from "reactstrap";

import { TabPage } from "../../driver-page";

import { BsSearch } from "react-icons/bs";

import CommonLayOut from "../../../layout";
import { useCustomerContext } from "../../../services/reducer/customer.reducer";
import { AiOutlinePlus } from "react-icons/ai";

// import { tableCells, tableHeadCells } from "./customer.constants";
// import { BasicTable } from "../../../features/table/BasicTable";
import { ICustomerDetails } from "../../../services/tms-objects/customer.types";
import { debounce, includes, isEmpty } from "lodash";

// import CreateNewCustomerForm from "./createNewCustomerForm";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { routes } from "../../routes/routes";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { Link, useNavigate } from "react-router-dom";
// import { useStateContext } from "../../../services/reducer/state.reducer";
// import CreateNewCustomerForm from "./createNewCustomerForm";
// import { initialCustomerState } from "../../tms-object/partners";

const CustomerPage = () => {

  const {
    getCustomerDetails,
   
    CustomerDetails,
    deleteCustomer,
    
    customerLoading,

  } = useCustomerContext();




  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState<ICustomerDetails[] | []>([]);
  // const [noCustomer, setnoCustomer] = useState(false);
  // const [customerNewDetails, setcustomerNewDetails] = useState<ICustomerDetails>(initialStateCustomer);
  // const [title, setTitle] = useState<boolean>(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  const [selectedCustomers, setSelectedCustomers] = useState<ICustomerDetails[] | []>([]);

  const navigate = useNavigate();




  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      CustomerDetails &&
      CustomerDetails.filter((customer) => {
        if (includes(customer.full_name.toLowerCase(), searchValue.toLowerCase())) {
          return customer;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedCustomers([]);
  };


  
  const handleDeleteCustomers = () => {
    selectedCustomers && deleteCustomer(selectedCustomers);

    getCustomerDetails().then((data) => {
      data && setFilteredData(data);
    });
    
    setDeleteModalOpen(false)
    console.log("clicked")
    setSelectedCustomers([]);
  };

  
  useEffect(() => {
    if (!customerLoading && CustomerDetails) {
      setFilteredData(CustomerDetails);
     
    }
  }, [customerLoading, CustomerDetails]);



  // useEffect(() => {
  //   if (isEmpty(filteredData)) {
  //     setnoCustomer(true);
  //   } else {
  //     setnoCustomer(false);
  //   }
  // }, [filteredData]);


  useEffect(() => {
    getCustomerDetails();
  }, []);
   
  const columns: CustomTableColumn[] = [
    {
      id: "full_name",
      name: "NAME",
      style: { width: "25%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.full_name
    },
    {
      id: "address",
      name: "ADDRESS",
      style: { width: "25%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.address
    },
    {
      id: "phone",
      name: "PHONE",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.phone
    },
    {
      id: "mc_number",
      name: "MC",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.mc_number
    },
    {
      id: "billing_type_id",
      name: "PAY METHOD",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.billing_type_id
    },
    {
      id: "credit_id",
      name: "CREDIT",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.credit_id
    },
    {
      id: "avg_days_to_pay",
      name: "AVG. DTP",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.credit_id
    },
    {
      id: "active",
      name: "STATUS",
      style: { width: "20%" },
      sortable: true,
      selector: (row: ICustomerDetails) => row.credit_id
    },
    {
      id: "action",
      name: "ACTION",
      style: { width: "5%" },
      sortable: false,
      selector: (row: ICustomerDetails) => row.customer_id,
      cell: (row: ICustomerDetails) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ navigate(`${routes.createNewCustomer}/${row.customer_id}`) }} />
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
                              className="border-start-0 border-end-0 search"
                              inputRef={inputRef} onChange={(e: any) =>
                                handleSearch(e.target.value)}
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
                  <TabPage tabTitles={["Brokers", "Shippers/Receivers"]}>

                    <TabPane tabId={1} className="m-2">
                    <CustomTable columns={columns} data={filteredData} noRecordMessage="No Customer found." canSelectRows={true} selectedTableRows={selectedCustomers} setSelectionTableRows={setSelectedCustomers} />
                    </TabPane>
                    <TabPane tabId={2} className="m-2">
                    <CustomTable columns={columns} data={filteredData} noRecordMessage="No Customer found." canSelectRows={true} selectedTableRows={selectedCustomers} setSelectionTableRows={setSelectedCustomers} />
                    </TabPane>

                  </TabPage>
                

            </CommonLayOut>
            <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
              <ModalHeader>
                <h6 className="mb-0 fw-bold"> Delete </h6>
              </ModalHeader>
              <ModalBody>
                <Container>
                  {!isEmpty(selectedCustomers) && (
                    <div className=" my-3 ">
                      {selectedCustomers.length > 1
                        ? `Are you sure you want to delete ${selectedCustomers.length} customers?`
                        : `Are you sure you want to delete customer "${selectedCustomers[0].first_name} ${selectedCustomers[0].last_name}"?`}
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
                      onClick={() => handleDeleteCustomers()}
                    >
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
