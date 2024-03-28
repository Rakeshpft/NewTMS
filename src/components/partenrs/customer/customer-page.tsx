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

import { tableCells, tableHeadCells } from "./customer.constants";
import { BasicTable } from "../../../features/table/BasicTable";
import { ICustomerDetails, initialStateCustomer } from "../../../services/tms-objects/customer.types";
import { debounce, includes, isEmpty } from "lodash";

import CreateNewCustomerForm from "./createNewCustomerForm";
import { useStateContext } from "../../../services/reducer/state.reducer";
// import CreateNewCustomerForm from "./createNewCustomerForm";
// import { initialCustomerState } from "../../tms-object/partners";

const CustomerPage = () => {

  const {
    getCustomerDetails,
    getIdividualCustomerDetails,
    CustomerDetails,
    deleteCustomer,
    saveCustomer,
    selectedCustomer,
    customerLoading,

  } = useCustomerContext();
  const {
    getState,
  } = useStateContext();



  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredData, setFilteredData] = useState<ICustomerDetails[] | []>([]);
  const [noCustomer, setnoCustomer] = useState(false);
  const [partnerCustomer, setPartnerCustomer] = useState(false)
  const [customerNewDetails, setcustomerNewDetails] = useState<ICustomerDetails>(initialStateCustomer);
  const [title, setTitle] = useState<boolean>(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedCustomers, setSelectedCustomers] = useState<ICustomerDetails[] | []>([]);





  const handleInputChange =
    (prop: keyof ICustomerDetails) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setcustomerNewDetails({ ...customerNewDetails, [prop]: event.target.value });
      };

  const handleCheckBoxBroker = () => {
    setcustomerNewDetails({ ...customerNewDetails, is_broker: !customerNewDetails.is_broker });

  };
  const handleCheckBoxShipper = () => {
    setcustomerNewDetails({ ...customerNewDetails, is_shipper_receiver: !customerNewDetails.is_shipper_receiver });
  };

  const handleDirectBillingRadio = () => {
    setcustomerNewDetails({ ...customerNewDetails, billing_type_id: 1 });
  };

  const handleFactoringRadio = () => {
    setcustomerNewDetails({ ...customerNewDetails, billing_type_id: 2 });
  };

  const handleSaveCustomer = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await saveCustomer(customerNewDetails).then((data) => {
      data?.success;
    });
    getCustomerDetails();
    setcustomerNewDetails(initialStateCustomer);
    setPartnerCustomer(false);

  };
  const handleClose = () => {

    setPartnerCustomer(false);

    getCustomerDetails();

  }

  const navigateToCreateCustomer = () => {

    setcustomerNewDetails(initialStateCustomer)
    setPartnerCustomer(true);
    setTitle(true);
  };

  const handleEditCustomer = (customer: ICustomerDetails) => {
    getIdividualCustomerDetails(customer.customer_id);

    setPartnerCustomer(true);
    setTitle(false);
  }

  useEffect(() => {
    if (selectedCustomer) {
      setcustomerNewDetails({
        ...CustomerDetails,
        first_name: selectedCustomer.first_name,
        last_name: selectedCustomer.last_name,
        full_name: selectedCustomer.full_name,
        customer_id: selectedCustomer.customer_id,
        is_broker: selectedCustomer.is_broker,
        is_shipper_receiver: selectedCustomer.is_shipper_receiver,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
        suite_number: selectedCustomer.suite_number,
        street_number: selectedCustomer.street_number,
        city: selectedCustomer.city,
        state_id: selectedCustomer.state_id,
        
        zipcode: selectedCustomer.zipcode,
        address: selectedCustomer.address,
        description: selectedCustomer.description,
        company_name: selectedCustomer.company_name,
        fid_ein: selectedCustomer.fid_ein,
        mc_number: selectedCustomer.mc_number,
        billing_type_id: selectedCustomer.billing_type_id,
        factor_id: selectedCustomer.factor_id,
        quick_pay_fee: selectedCustomer.quick_pay_fee,
        status_id: selectedCustomer.status_id,
        customer_status_name: selectedCustomer.customer_status_name,
        credit_id: selectedCustomer.credit_id,
        pay_terms: selectedCustomer.pay_terms,
        avg_days_to_pay: selectedCustomer.avg_days_to_pay,
        active: selectedCustomer.active,
      });
    }
  }, [selectedCustomer]);

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
    setDeleteModalOpen(true)
    console.log("clicked")
  };

  // const handleFileUpload = () => {
  //   setUploadModalOpen(true)
  //   console.log("pushed")
  // }

  useEffect(() => {
    if (!customerLoading && CustomerDetails) {
      setFilteredData(CustomerDetails);
      setnoCustomer(isEmpty(CustomerDetails));
    }
  }, [customerLoading, CustomerDetails]);



  useEffect(() => {
    if (isEmpty(filteredData)) {
      setnoCustomer(true);
    } else {
      setnoCustomer(false);
    }
  }, [filteredData]);


  useEffect(() => {
    getCustomerDetails();
  }, []);
   
  useEffect(() => {
    getState();
  }, []);


  return (
    <>
      {partnerCustomer ?
        (<CreateNewCustomerForm
          CustomerNewDetails={customerNewDetails}
          setCustomerDetails={setcustomerNewDetails}
          handleInputChange={handleInputChange}
          selectedCustomer={selectedCustomer}
          handleSaveCustomer={handleSaveCustomer}

          title={title}
          handleClose={handleClose}
          handleCheckBoxBroker={handleCheckBoxBroker}
          handleCheckBoxShipper={handleCheckBoxShipper}
          setcustomerNewDetails={setcustomerNewDetails}
          handleDirectBillingRadio={handleDirectBillingRadio}
          handleFactoringRadio={handleFactoringRadio}


        />) : (
          <>
            <CommonLayOut>

              <div className=" d-flex p-3">
                <div className=" content w-100">
                  <div className=" content-header d-flex justify-content-between">
                    <div className="page-title">
                      <h5> Customers </h5>
                    </div>
                    <div>
                      <div className=" page-subtitle d-flex align-items-center gap-3">
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
                        <Button color="primary" onClick={navigateToCreateCustomer}>
                          <AiOutlinePlus />
                          New Customer
                        </Button>

                      </div>
                    </div>
                  </div>
                  <TabPage tabTitles={["Brokers", "Shippers/Receivers"]}>

                    <TabPane tabId={1} className="m-2">
                      <BasicTable
                        emptyState={noCustomer}
                        canSelectRows={true}
                        selectedTableRows={selectedCustomers}
                        setSelectionTableRows={setSelectedCustomers}
                        tableData={filteredData}
                        tableHeadCells={tableHeadCells}
                        loading={customerLoading}
                        tableCells={tableCells}
                        canEditRow={true}
                        editRow={handleEditCustomer}
                      />
                    </TabPane>
                    <TabPane tabId={2} className="m-2">
                      <BasicTable
                        emptyState={noCustomer}
                        canSelectRows={true}
                        selectedTableRows={selectedCustomers}
                        setSelectionTableRows={setSelectedCustomers}
                        tableData={filteredData}
                        tableHeadCells={tableHeadCells}
                        loading={customerLoading}
                        tableCells={tableCells}
                        canEditRow={true}
                        editRow={handleEditCustomer}
                      />
                    </TabPane>

                  </TabPage>
                </div>


              </div>

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
                        ? `Are you sure you want to delete ${selectedCustomers.length} contacts?`
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
        )}
    </>


  );
};

export default CustomerPage;
