import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
// import { MdOutgoingMail } from "react-icons/md";
// import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import {

  FormGroup,
  Input,
  InputGroup,
  InputGroupText,

  Container,
  Modal,
  ModalBody,
  ModalHeader,
  
  Button,
} from "reactstrap";
// import { Header, SideBar } from "../../shared";
// import Profile from "../../pofile";
// import { BiCheck } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";
import { routes } from "../../routes/routes";

import { debounce, includes, isEmpty } from "lodash";
import { HiCheckCircle, HiOutlinePencilAlt } from "react-icons/hi";
import CommonLayOut from "../../../layout";
// import { ICustomerDetails } from "../../../services/tms-objects/customer.types";
// import { TabPage } from "../../driver-page";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { ITruckObject } from "../../../services/tms-objects/truck.types";
import { useTruckContext } from "../../../services/reducer/truck.reducer";
import { toastify } from "../../../features/notification/toastify";
import { MdCancel } from "react-icons/md";
import moment from "moment";


const TrucksPage = () => {

  const {
    getTruckList,
    truckList,
    deleteTruck,
    truckLoading,
  } = useTruckContext();

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [filteredData, setFilteredData] = useState<ITruckObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  const [selectedTrucks, setSelectedTrucks] = useState<ITruckObject[] | []>([]);


  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      truckList &&
      truckList.filter((truck) => {
        if (includes(truck.eld_provider_name.toLowerCase(), searchValue.toLowerCase())
        || includes(truck.unit.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.make.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.model.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.vin_number.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.ownership_type_name.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.driver_name.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.location.toLowerCase(), searchValue.toLowerCase())
      || includes(truck.plate_number.toString(), searchValue.toLowerCase())
      || includes(truck.purchase_date.toString(), searchValue.toLowerCase())

        )
           {
          return truck;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);


  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedTrucks([]);
  };

  
  const handleDeleteTrucks =async () => {
    
    const deletedTruckIds = selectedTrucks.map(doc => doc.truck_id);
  
   await deleteTruck(deletedTruckIds)
      .then(response => {
        console.log(response);
       response &&
        toastify({
        message: response.message,
        type: response.success ? "success" : "error",
    })
  })
      setDeleteModalOpen(false);
      setSelectedTrucks([]);
  };

  useEffect(() => {
    if (!truckLoading && truckList) {
      setFilteredData(truckList);
     
    }
  }, [truckLoading, truckList]);

  useEffect(() => {
    getTruckList();
  }, []);


  const columns: CustomTableColumn[] = [
    {
      id: "unit",
      name: "UNIT",
      style: { width: "5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.unit,
    },
    {
      id: "make",
      name: "MAKE",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.make,
    },
    {
      id: "model",
      name: "MODEL",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.model
    },
    {
      id: "vin_number",
      name: "VIN",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.vin_number
    },
    {
      id: "plate_number",
      name: "PLATE",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.plate_number
    },
    {
      id: "purchase_date",
      name: "REG. DATE",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.purchase_date,
      format: (row: ITruckObject) =>  moment(row.purchase_date).format('L')

    },
    {
      id: "ownership_type_id",
      name: "OWNERSHIP",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.ownership_type_name
    },
    {
      id: "driver_id",
      name: "DRIVER",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.driver_name
    },
    {
      id: "eld_provider_id",
      name: "ELD PROVIDER",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.eld_provider_name
    },
    {
      id: "location",
      name: "LOCATION",
      style: { width: "15%" },
      sortable: true,
      selector: (row: ITruckObject) => row.location,
      format: (row: ITruckObject) => (`${row.lease_suite_number} ${row.lease_street} ${row.lease_city} ${row.lease_state_name} ${row.lease_zipcode}`)

    },
    {
      id: "warnings",
      name: "WARNINGS",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.warning,

    },
    {
      id: "active",
      name: "STATUS",
      style: { width: "5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.is_active,
      cell:(row:ITruckObject)=>(row.is_active ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },
    {
      id: "action",
      name: "ACTION",
      style: { width: "5%" },
      sortable: false,
      selector: (row: ITruckObject) => row.truck_id,
      cell: (row: ITruckObject) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewTruck}/${row.truck_id}`) }} />
    }
  ]
  return (

    <>
      <CommonLayOut>
        <div className=" d-flex justify-content-between">
          <div className="page-title">Trucks</div>
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
                    inputRef={inputRef} onChange={(e: any) =>
                      handleSearch(e.target.value)}
                  />
                </InputGroup>
              </div>

              <div className="user-info-btn-wrapper">
                {!isEmpty(selectedTrucks) && (
                  <div className="user-info-btn">

                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
              <Link to={routes.createNewTruck}>
                <Button color="primary" >
                  <AiOutlinePlus />
                  New Truck
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No Trucks found." canSelectRows={true} selectedTableRows={selectedTrucks} setSelectionTableRows={setSelectedTrucks} />
      </CommonLayOut>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold"> Delete </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedTrucks) && (
              <div className=" my-3 ">
                {selectedTrucks.length > 1
                  ? `Are you sure you want to delete ${selectedTrucks.length} trucks?`
                  : `Are you sure you want to delete truck "${selectedTrucks[0].unit}"?`}
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
                onClick={() => handleDeleteTrucks()}
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

export default TrucksPage;
