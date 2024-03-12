import React, { useEffect } from "react";
import { Button, Input, InputGroup, InputGroupText } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { routes } from "../routes/routes";
import CommonLayOut from "../../layout";
import { useNavigate } from "react-router-dom";
import { BasicTable } from "../../features/table/BasicTable";
import { tableHeadCells } from "./deiver.constants";
import { useDriverContext } from "../context/Driver/driver.reducer";

const DriverPage = () => {
  const navigate = useNavigate();
  const { getDriverList } = useDriverContext();

  const navigateToCreateDriver = () => {
    navigate(routes.createNewDriver);
  };
useEffect(()=>{
  getDriverList( ).then((res)=>{
    console.log("driver",res)
  })
  
} ,[])
  
  return (
    <CommonLayOut>
      <>
        <div className=" d-flex p-3">
          <div className=" content w-100">
            <div className=" content-header d-flex justify-content-between">
              <div className="driver-title">
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
                        className="border-start-0 border-end-0 search"
                        // value={filter}
                        // onChange={handleSearchFilterChange}
                      />
                      <InputGroupText className="bg-white">
                        <Button
                          color="link"
                          size="sm"
                          className="p-0"
                          // onClick={() => searchToggle()}
                        >
                          <BsSliders2 size={16} />
                        </Button>
                      </InputGroupText>
                    </InputGroup>
                  </div>

                  <Button color="primary" onClick={navigateToCreateDriver}>
                    <AiOutlinePlus />
                    Invite User
                  </Button>
                </div>
              </div>
            </div>
            <BasicTable
              emptyState={false}
              tableData={[]}
              tableHeadCells={tableHeadCells}
              loading={false}
              tableCells={[]}
            />
          </div>
        </div>
      </>
    </CommonLayOut>
  );
};

export default DriverPage;
