import React, { useEffect, useRef, useState } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import CommonLayOut from "../../layout";
import { debounce, includes } from "lodash";
import {
  IDriverObject,
} from "../../services/tms-objects/driver.types";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";
import { CustomTable } from "../../features/data-table/CustomTable";
import { useDriverContext } from "../../services/reducer/driver.reducer";

const DriverPage = () => {
  // const {
  //   getDriverList,
  //   driverAddList,
  //   getIdividualDriver,
  //   driverLoading,
  //   selectedDriver,
  //   getDriverType,
  //   driverType,
  //   getDriverStatus,
  //   driverStatus,
  //   postSaveDriverData,
  //   getDriverPayRateList,
  //   selectedPayRates,
  //   postPayRates,
  //   postDriverImage,
  // } = useDriverContext();
  
const { driverAddList ,getDriverList, driverLoading } = useDriverContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
 
  // const [newDriver, setNewDriver] = useState<IDriverObject>(initialStateDriver);
  // const [driverPayRates, setDriverPayrates] = useState<IDriverPayRatesOject>(
  //   initialStatedriver_pay_rates
  // );
  const [filteredData, setFilteredData] = useState<IDriverObject[]>([]);
  

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      driverAddList &&
      driverAddList.filter((user) => {
        if (includes(user.full_name.toLowerCase(), searchValue.toLowerCase())) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
    console.log("filetered data", filteredData);
  }, 500);

  

  
  

  // const navigateToCreateDriver = () => {
  //   setNewDriverDetails(true);
  //   setNewDriver(initialStateDriver);
  //   setDriverPayrates(initialStatedriver_pay_rates);
  // };

 

  // const handleEditDriver = (driver: IDriverObject) => {
  //   getIdividualDriver(driver.driver_id);
  //   getDriverPayRateList(driver.driver_id);
  //   setNewDriverDetails(true);
  //   console.log("indi", driver.driver_id);
  // };

  

  useEffect(() => {
    if (!driverLoading && driverAddList) setFilteredData(driverAddList);
   
  }, [driverAddList, driverLoading]);

  // useEffect(() => {
  //   if (isEmpty(filteredData)) {
  //     setNoDriver(true);
  //   } else {
  //     setNoDriver(false);
  //   }
  // }, [filteredData]);

  
  useEffect(() => {
    getDriverList();
  }, []);
  

  
  const columns: CustomTableColumn[] = [
    {
      id: "full_name",
      name: "Name",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.full_name,
      format: (row: IDriverObject) => `${row.first_name} ${row.last_name}`,
      sortable: true,
    },
    {
      id: "email",
      name: "Email",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.email,
      sortable: true,
    },
    {
      id: "phone",
      name: "Phone",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.phone,
      sortable: true,
    },
    {
      id: "driver_type",
      name: "Driver Type",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.driver_type_id,
      sortable: true,
    },
    {
      id: "vendor_id",
      name: "Driver Type",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.vendor_id,
      sortable: true,
    },
    {
      id: "status",
      name: "Status",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.status_id,
      sortable: true,
    },
    {
      id: "truck_id",
      name: "Truck",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.truck_id,
      sortable: true,
    },
    {
      id: "trailer_id",
      name: "Trailer",
      style: { width: "15%" },
      selector: (row: IDriverObject) => row.trailer_id,
      sortable: true,
    },

    {
      id: "action",
      name: "Action",
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
      sortable: true,
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
                <Link to={routes.createNewDriver}>
                  <Button color="primary" >
                    <AiOutlinePlus />
                    New Driver
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <CustomTable columns={columns} data={filteredData} />
        </CommonLayOut>
      </>
    </>
  );
};

export default DriverPage;
