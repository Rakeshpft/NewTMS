import React, { useContext, useEffect,  useState } from "react";
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

import { isEmpty } from "lodash";
import { HiCheckCircle, HiExclamationCircle, HiOutlinePencilAlt } from "react-icons/hi";
import CommonLayOut from "../../../layout";
// import { ICustomerDetails } from "../../../services/tms-objects/customer.types";
// import { TabPage } from "../../driver-page";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { ITruckObject } from "../../../services/tms-objects/truck.types";
import { useTruckContext } from "../../../services/reducer/truck.reducer";
import { toastify } from "../../../features/notification/toastify";
import { MdCancel } from "react-icons/md";
import { LoadingContext } from "../../../services/context/loading.context";
import { Convert } from "../../../features/shared/helper";


const TrucksPage = () => {

  const {
    getTruckList,
    truckList,
    deleteTruck,
    truckLoading,
  } = useTruckContext();

  const navigate = useNavigate();
  const { setLoader } = useContext(LoadingContext);

  const [filteredData, setFilteredData] = useState<ITruckObject[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [filter, setFilter] = useState("");
  const [selectedTrucks, setSelectedTrucks] = useState<ITruckObject[] | []>([]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    truckList
      const value = e.target.value.toLowerCase();
      const filteredData = truckList && truckList.filter((item) => {
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
    setSelectedTrucks([]);
  };

  
  const handleDeleteTrucks =async () => {
    
    const deletedTruckIds = selectedTrucks.map(doc => doc.truck_id);
  setLoader(true);
   await deleteTruck(deletedTruckIds)
      .then(response => {
        console.log(response);
       response &&
        toastify({
        message: response.message,
        type: response.success ? "success" : "error",
    })
    setLoader(false);
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
      id: "registration_date",
      name: "REG. DATE",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.registration_date  ,
      format: (row: ITruckObject) =>Convert.ToUserDate(row.registration_date)
       
    },
    {
      id: "ownership_type_name",
      name: "OWNERSHIP",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.ownership_type_name
    },
    {
      id: "driver_name",
      name: "DRIVER",
      style: { width: "8.5%" },
      sortable: true,
      selector: (row: ITruckObject) => row.driver_name
    },
    {
      id: "eld_provider_name",
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
      sortable: false,
      align: "center",
      selector: (row: ITruckObject) => row.warning,
      cell:(row:ITruckObject)=>(row.warning ? <HiCheckCircle size={20} className="text-success " /> : <HiExclamationCircle size={20} className="text-warning " />)


    },
    {
      id: "active",
      name: "STATUS",
      style: { width: "5%"}, 
      align: "center",
      sortable: false,
      selector: (row: ITruckObject) => row.is_active,
      cell:(row:ITruckObject)=>(row.is_active ? <HiCheckCircle size={20} className="text-success " /> : <MdCancel size={20} className="text-danger align-center" />)
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
                   value={filter}
                   onChange={handleSearch}/>
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
          <h6 className="mb-0 fw-bold">Delete Truck</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedTrucks) && (
              <div className=" my-3 ">
                {selectedTrucks.length > 1?(<div>You have selected {selectedTrucks.length} trucks.<br /></div>):null}
                  Are you sure you want to delete?
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
