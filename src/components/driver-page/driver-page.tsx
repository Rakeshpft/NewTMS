import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../layout";
import { BasicTable } from "../../features/table/BasicTable";
import { tableCells, tableHeadCells } from "./deiver.constants";
import { useDriverContext } from "../../services/reducer/driver.reducer";
import CreateNewDriverForm from "./createNewDriverForm";
import { debounce, includes, isEmpty } from "lodash";
import { IDriverObject, IDriverPayRatesOject, initialStateDriver, initialStatedriver_pay_rates } from "../../services/tms-objects/driver.types";
import { toastify } from "../../features/notification/toastify";
import useVendorContext from "../../services/reducer/vendor.reducer";
import { useTruckContext } from "../../services/reducer/truck.reducer";
import { useTrailerContext } from "../../services/reducer/trailer.reducer";

const DriverPage = () => {

  const { getDriverList, driverAddList, getIdividualDriver, driverLoading ,selectedDriver , getDriverType , driverType ,getDriverStatus ,driverStatus , postSaveDriverData , getDriverPayRateList , selectedPayRates , postPayRates ,postDriverImage } = useDriverContext();
  const { getVendorList , vendorList} = useVendorContext();
  const {   truckListStatus } = useTruckContext();
  const { getTrailer  ,trailerListStatus } = useTrailerContext();

  const inputRef = useRef<HTMLInputElement>(null);
  
  const [newDriverDetails, setNewDriverDetails] = useState(false);
  const [newDriver, setNewDriver] = useState<IDriverObject>(initialStateDriver);
  const [driverPayRates , setDriverPayrates] = useState<IDriverPayRatesOject>(initialStatedriver_pay_rates);
  const [filteredData, setFilteredData] = useState<IDriverObject[]>([]);
  const [noDriver, setNoDriver] = useState(false);

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      driverAddList &&
      driverAddList.filter((user) => {
        if (includes(user.full_name.toLowerCase(), searchValue.toLowerCase())) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
    console.log( "filetered data", filteredData)
  }, 500);

const handleInputChange = (prop : keyof IDriverObject ) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setNewDriver({ ...newDriver, [prop]: event.target.value });
}
const handleInputDriverPayRates = (prop : keyof IDriverPayRatesOject ) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setDriverPayrates({ ...driverPayRates, [prop]: event.target.value });
}
const handleCheckboxChange = () => {
  setNewDriver({ ...newDriver, is_IFTA_handled_by_company: !newDriver.is_IFTA_handled_by_company });
}

useEffect(() => {
  if(selectedDriver){
    setNewDriver({
      ...newDriver,
      first_name : selectedDriver.first_name,
      last_name : selectedDriver.last_name,
      email : selectedDriver.email,
      phone : selectedDriver.phone,
      driver_id : selectedDriver.driver_id,
      status_id : selectedDriver.status_id,
      truck_id : selectedDriver.truck_id,
      trailer_id : selectedDriver.trailer_id,
      contact_number : selectedDriver.contact_number,
      dob : selectedDriver.dob,
      address_line1 : selectedDriver.address_line1,
      address_line2 : selectedDriver.address_line2,
      city : selectedDriver.city,
      state_id : selectedDriver.state_id,
      zipcode : selectedDriver.zipcode,
      fuel_card : selectedDriver.fuel_card,
      create_new_factor : selectedDriver.create_new_factor,
      is_IFTA_handled_by_company : selectedDriver.is_IFTA_handled_by_company,
      street_number  : selectedDriver.street_number,
      suite_number : selectedDriver.suite_number,
      driver_type_id : selectedDriver.driver_type_id,
      driver_status_id : selectedDriver.driver_status_id,
      vendor_id : selectedDriver.vendor_id, 
      driver_images : selectedDriver.driver_images
      
    })
  }
} , [selectedDriver])

useEffect (() => {
  if(selectedPayRates) {
    setDriverPayrates({
      ...driverPayRates,
      per_hour : selectedPayRates.per_hour,
      per_mile  : selectedPayRates.per_mile,
      driver_pay_rate_id : selectedPayRates.driver_pay_rate_id,
      amount  : selectedPayRates.amount,
      active  : selectedPayRates.active,
      pay_rate_type_id  : selectedPayRates.pay_rate_type_id,
      period  : selectedPayRates.period,  
      driver_id  : selectedPayRates.driver_id,
      per_empty_mile  : selectedPayRates.per_empty_mile,
      starting_on  : selectedPayRates.starting_on,
      per_extra_stop  : selectedPayRates.per_extra_stop,
      
    })
  }
} , [selectedPayRates])

  const navigateToCreateDriver = () => {
    setNewDriverDetails(true);
    setNewDriver(initialStateDriver);
    setDriverPayrates(initialStatedriver_pay_rates)
    
  };

const  handleCloseForm = () => {
    setNewDriverDetails(false);
    getDriverList();
  }

  const handleEditDriver =  ( driver : IDriverObject ) => {
    getIdividualDriver(driver.driver_id)
    getDriverPayRateList(driver.driver_id);
    setNewDriverDetails(true);
    console.log("indi", driver.driver_id)
  }
  console.log("newDriver", newDriver.driver_id)
 

  useEffect(() => {
    if (!driverLoading && driverAddList) 
    setFilteredData(driverAddList);
    setNoDriver(isEmpty(driverAddList));
  }, [driverAddList, driverLoading]);

  useEffect(() => {
    if (isEmpty(filteredData)) {
      setNoDriver(true);
    } else {
      setNoDriver(false);
    }
  }, [filteredData]);

  useEffect(() => {
    getDriverList();
    getDriverType();
    getDriverStatus()
    getVendorList()
     //getTruck()
    getTrailer()
  }, []);

const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {
      await postDriverImage(event.target.files[0] , newDriver.driver_id).then((response) => {
      response?.value && setNewDriver({...newDriver,  driver_images : response.value})
    })
  
    }; 
}
  
  const SaveDriverIndividual = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    postSaveDriverData(newDriver).then((response) => {
    response &&   toastify({ message: response.message, type: (response.success ? "success" : "error") });
  });

    postPayRates( driverPayRates,newDriver.driver_id)
    getDriverList();
    setNewDriverDetails(false);
    setNewDriver(initialStateDriver);
    setDriverPayrates(initialStatedriver_pay_rates)

   
  };


  return (
    <>
      {newDriverDetails ? (
        <CreateNewDriverForm  
        newDriver={newDriver}
        handleInputChange={handleInputChange}
        handleCloseForm={handleCloseForm}
        driverType={driverType}
        driverStatus = {driverStatus}
        vendorList = {vendorList}
        truckListStatus = {truckListStatus}
        handleCheckboxChange={handleCheckboxChange}
        SaveDriverIndividual={SaveDriverIndividual}
        trailerListStatus = {trailerListStatus}
        driverPayRates = {driverPayRates}
        handleInputDriverPayRates = {handleInputDriverPayRates}
        handleImageChange = {handleImageChange}

          />
      ) : (
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
             
              <InputGroupText className="bg-white"><BsSearch size={16} /></InputGroupText>
              <Input placeholder="Search" className="border-start-0 search" inputRef={inputRef} onChange={(e: any) => handleSearch(e.target.value)} />
            </InputGroup>
           
            </div>

                  <Button color="primary" onClick={navigateToCreateDriver}>
                    <AiOutlinePlus />
                    New Driver
                  </Button>
                </div>
              </div>
            </div>

            <BasicTable
              emptyState={noDriver}
              tableData={filteredData}
              tableHeadCells={tableHeadCells}
              loading={driverLoading}
              tableCells={tableCells}
              canEditRow={true}
               editRow={handleEditDriver}
            />
          </CommonLayOut>
        </>
      )}
    </>
  );
};

export default DriverPage;
