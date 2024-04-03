import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../../layout";
import { CustomTable } from "../../../features/data-table/CustomTable";
import { useFuelCardContext } from "../../../services/reducer/fuel-card.reducer";
import { IFuelCardObject } from "../../../services/tms-objects/fuel-card.types";
import { HiCheckCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

const FuelPage = () => {
  const [filteredData, setFilteredData] = useState<IFuelCardObject[]>([]);
  const [filter, setFilter] = useState("");
  const { getFuelCardList, fuelCardList,isLoading } = useFuelCardContext()

  const columns :CustomTableColumn[] = [
    {
      id:'card_number',
      name:'Card Number',
      style: { width: '25%' },
      selector:(row:IFuelCardObject)=>row.card_number
    },
    {
      id:'expiration_date',
      name:'Expiration Date',
      style: { width: '20%' },
      selector:(row:IFuelCardObject)=>row.expiration_date
    },
    {
      id:'driver_name',
      name:'Assigned To',
      style: { width: '15%' },
      selector:(row:IFuelCardObject)=>row.driver_name
    },
    {
      id:'notes',
      name:'Notes',
      style: { width: '20%' },
      selector:(row:IFuelCardObject)=>row.notes
    },
    {
      id: 'is_active',
      name: 'Status',
      style: { width: '10%' },
      sortable: false,
      align:'center',
      selector: (row: IFuelCardObject) => row.is_active,
      cell:(row:IFuelCardObject)=>(row.is_active ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },
    {
      id: 'action',
      name: 'Action',
      style: { width: '5%' },
      sortable: false,
      align:'center',
      selector: (row: IFuelCardObject) => row.fuel_card_id,
      cell: (row:IFuelCardObject) => <Link to={`${routes.createNewFuelPage}/${row.fuel_card_id}`} ><HiOutlinePencilAlt size={20} style={{cursor:"pointer"}} /></Link> 
    },
  ]

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = fuelCardList && fuelCardList.filter((item) => {
      return columns.some((column) =>
        String(item[column as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    filteredData && setFilteredData(filteredData);
  };

  useEffect(()=>{
    getFuelCardList();
 },[])
  useEffect(()=>{
    if(!isLoading && fuelCardList){
        setFilteredData(fuelCardList);
    }
  },[fuelCardList])

  return (
    <CommonLayOut>
      <div className="d-flex justify-content-between">
        <div className="page-title">
          View Fuel Cards
        </div>
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
          <Link className="btn btn-primary" to={routes.createNewFuelPage} ><AiOutlinePlus />  New Fuel Card </Link>
        </div>
        </div>
      </div>  
      <CustomTable columns={columns} data={filteredData} noRecordMessage="No fuel card found." />          
    </CommonLayOut>
  );
};

export default FuelPage;
