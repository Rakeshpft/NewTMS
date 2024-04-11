import React, { useEffect, useRef, useState } from "react";
import { Button, Container, FormGroup, Input, InputGroup, InputGroupText, Modal, ModalBody, ModalHeader } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../layout";
import { debounce, includes, isEmpty } from "lodash";
import {
  IDriverObject,
} from "../../services/tms-objects/driver.types";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { CustomTable } from "../../features/data-table/CustomTable";
import { useDriverContext } from "../../services/reducer/driver.reducer";
import { toastify } from "../../features/notification/toastify";

const DriverPage = () => {
 
  
const { driverAddList , getDriverList , driverDelete , driverLoading } = useDriverContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
 
  
  const [filteredData, setFilteredData] = useState<IDriverObject[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      driverAddList &&
      driverAddList.filter((user) => {
        if (includes(user.first_name.toLowerCase(), searchValue.toLowerCase())) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
    console.log("filetered data", filteredData);
  }, 500);

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDriver([]);
  };

  useEffect(() => {
    if (!driverLoading && driverAddList)
      
       setFilteredData(driverAddList);
   
  }, [driverAddList, driverLoading]);

 const  handleDeleteDriver = () => {

  const deletedDriverId = selectedDriver.map( driverId => driverId.driver_id );

  driverDelete(deletedDriverId).then((response ) => {
    response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
  })
  getDriverList();
  setDeleteModalOpen(false);
  setSelectedDriver([]);
 }

 
  
  useEffect(() => {
    getDriverList();
  }, []);
  

  
  const columns: CustomTableColumn[] = [
    {
      id: "driver_name",
      name: "NAME",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.driver_name,
      format: (row: IDriverObject) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      id: "email",
      name: "EMAIL",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.email,
      sortable: true,
    },
    {
      id: "contact_number",
      name: "PHONE",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.contact_number,
      sortable: true,
    },
    {
      id: "driver_type_id",
      name: "DRIVER TYPE",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.driver_type_name,
      sortable: true,
    },
    {
      id: "vendor_name",
      name: "VENDOR",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.vendor_name,
      sortable: true,
    },
    {
      id: "driver_status_name",
      name: "STATUS",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.driver_status_name,
      sortable: true,
    },
    {
      id: "truck_id",
      name: "TRUCK",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.truck_id,
      sortable: true,
    },
    {
      id: "trailer_id",
      name: "TRAILER",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.trailer_id,
      sortable: true,
    },

    {
      id: "action",
      name: "ACTIONS",
      style: { width: "5%" },
      selector: (row: IDriverObject) => row.driver_id,
      cell: (row: IDriverObject) => (
        <HiOutlinePencilAlt
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate(`${routes.createNewDriver}/${row.driver_id}`);
          }}
        />
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <>
        <CommonLayOut>
          <div className="d-flex justify-content-between">
            <div className="page-title">
              <h5> View Drivers</h5>
            </div>
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
                      inputRef={inputRef}
                      onChange={(e: any) => handleSearch(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <div className="user-info-btn-wrapper">
                {!isEmpty(selectedDriver) && (
                  <div className="user-info-btn">

                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
                <Link to={routes.createNewDriver}>
                  <Button color="primary" >
                    <AiOutlinePlus />
                    New Driver
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <CustomTable columns={columns} data={filteredData} noRecordMessage="No Driver found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
        </CommonLayOut>
        <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
              <ModalHeader>
                <h6 className="mb-0 fw-bold"> Delete </h6>
              </ModalHeader>
              <ModalBody>
                <Container>
                  {!isEmpty(selectedDriver) && (
                    <div className=" my-3 ">
                      {selectedDriver.length > 1
                        ? `Are you sure you want to delete ${selectedDriver.length} customers?`
                        : `Are you sure you want to delete customer "${selectedDriver[0].first_name} ${selectedDriver[0].last_name}"?`}
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
                      onClick={() => handleDeleteDriver()}
                    >
                      Delete
                    </Button>
                  </FormGroup>
                </Container>
              </ModalBody>
            </Modal>
      </>
    </>
  );
};

export default DriverPage;
