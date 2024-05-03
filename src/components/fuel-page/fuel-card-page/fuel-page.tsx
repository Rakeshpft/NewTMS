import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "reactstrap";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../../layout";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { useFuelCardContext } from "../../../services/reducer/fuel-card.reducer";
import { IFuelCardObject } from "../../../services/tms-objects/fuel-card.types";
import { AiOutlinePlus } from "react-icons/ai";
import { isEmpty } from "lodash";
import { HiCheckCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { toastify } from "../../../features/notification/toastify";
import { MdCancel } from "react-icons/md";
import { Convert } from "../../../features/shared/helper";

const FuelPage = () => {
  const { getFuelCardList, fuelCardList, deleteFuelCard } = useFuelCardContext()
  const [filteredData, setFilteredData] = useState<IFuelCardObject[]>([]);
  const [filter, setFilter] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFuelCard, setSelectedFuelCard] = useState<IFuelCardObject[] | []>([]);
  const navigate = useNavigate();

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = fuelCardList && fuelCardList.filter((item) => {
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
    setSelectedFuelCard([]);
  };

  const handleDeleteFuelCard =async () => {    
    debugger;
    const deletedfuel_card_Ids = selectedFuelCard.map(doc => doc.fuel_card_id);  
    await deleteFuelCard(deletedfuel_card_Ids).then(response => {
       response && toastify({ message: response.message, type: response.success ? "success" : "error", })
    })
    setDeleteModalOpen(false);
    setSelectedFuelCard([]);
    getFuelCardList();
  };

  useEffect(()=>{
    getFuelCardList();
  },[])
  
  useEffect(()=>{
    if(fuelCardList){
        setFilteredData(fuelCardList);
    }
  },[fuelCardList])

  const columns :CustomTableColumn[] = [
    {
      id:'card_number',
      name:'CARD NUMBER',
      style: { width: '15%' },
      sortable:true,
      selector:(row:IFuelCardObject)=>row.card_number
    },
    {
      id:'is_active',
      name:'CARD STATUS',
      style: { width: '10%' },
      sortable:false,
      align:'center',
      selector:(row:IFuelCardObject)=>row.is_active,
      cell:(row:IFuelCardObject)=>(row.is_active ? <HiCheckCircle size={20} className="text-success " /> : <MdCancel size={20} className="text-danger align-center" />)

    },
    {
      id:'expiration_date',
      name:'CARD EXPIRY',
      style: { width: '10%' },
      sortable:true,
      selector:(row:IFuelCardObject)=>row.expiration_date
    },
    {
      id:'driver_name',
      name:'ASSIGNED TO',
      style: { width: '15%' },
      sortable:true,
      selector:(row:IFuelCardObject)=>row.driver_name
    },
    {
      id:'driver_name',
      name:'ASSIGNED ON',
      style: { width: '15%' },
      sortable:true,
      selector:(row:IFuelCardObject)=>row.assigned_date,
      format:(row:IFuelCardObject)=>Convert.ToUserDate(row.assigned_date)
    },
    {
      id:'notes',
      name:'NOTES',
      style: { width: '25%' },
      sortable:true,
      selector:(row:IFuelCardObject)=>row.notes
    },
    {
      id: 'action',
      name: 'ACTION',
      style: { width: '5%' },
      sortable: false,
      align:'center',
      selector: (row: IFuelCardObject) => row.fuel_card_id,
      cell: (row: IFuelCardObject) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { navigate(`${routes.createNewFuelPage}/${row.fuel_card_id}`) }} />
    },
  ]

  return (
    <>
    <CommonLayOut>
      <div className="d-flex justify-content-between">
        <div className="page-title">View Fuel Cards</div>
        <div>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup className="shadow-sm border-secondary">
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <Input placeholder="Search" className="border-start-0 search" value={filter} onChange={handleSearchFilterChange} />
            </InputGroup>
          </div>
          <div className="user-info-btn-wrapper">
                {!isEmpty(selectedFuelCard) && (
                  <div className="user-info-btn">
                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>

          <Link className="btn btn-primary" to={routes.createNewFuelPage} ><AiOutlinePlus />  Add Fuel Card </Link>
        </div>
        </div>
      </div>  
      <CustomTable columns={columns} data={filteredData} noRecordMessage="No fuel card found." canSelectRows={true} selectedTableRows={selectedFuelCard} setSelectionTableRows={setSelectedFuelCard} />         
    </CommonLayOut>

    <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Delete</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedFuelCard) && (
              <div className=" my-3 ">
                 {selectedFuelCard.length > 1?(<div>You have selected {selectedFuelCard.length} trucks.<br /></div>):null}
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

export default FuelPage;
