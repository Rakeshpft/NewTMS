// import { Form, useNavigate } from "react-router-dom";
// import { routes } from "../routes/routes";
import React from "react";
import { Row, Col, TabPane } from "reactstrap";
import TabPage from "./tab-page";
import DriversDetails from "./createDriver/driversDetails";
import DocumentsDetails from "./createDriver/documentDetailsPage/documentsDetails";
import SchedulePayment from "./createDriver/schedulePayment";
import AdditionalPayee from "./createDriver/additionalPayee";
import CommonLayOut from "../../layout";
import { IDriverManagenetProps } from "../../services/tms-objects/driver.types";

const CreateNewDriverForm = ( prop : IDriverManagenetProps ) => {
   const { 
    newDriver ,
    handleInputChange ,
    handleCloseForm ,
    driverType,
    driverStatus,
    handleCheckboxChange,
    SaveDriverIndividual,
    vendorList,
    truckListStatus,
    trailerListStatus,
    driverPayRates,
    handleInputDriverPayRates,
    handleImageChange
   
  } = prop

  // const [ filterDocApp , setFilterDocApp] = useState()




  return (
    <CommonLayOut>
      <Row className="page-title">
        <Col>Create New Driver</Col>
      </Row>

      <TabPage
        tabTitles={[
          "Details",
          "Documents",
          "Schedule Payment/ Deduction",
          "Additional Payee",
        ]}
        disabledTabs={newDriver.driver_id===0?[1,2,3]:[]}
      >
        <TabPane tabId={1} className=""   >
          <DriversDetails 
          newDriver = {newDriver}
          handleInputChange = {handleInputChange}
          handleCloseForm = {handleCloseForm}
          driverType = {driverType}
          driverStatus= {driverStatus}
          handleCheckboxChange = {handleCheckboxChange}
          SaveDriverIndividual = {SaveDriverIndividual}
          vendorList = {vendorList}
          truckListStatus={truckListStatus}
          trailerListStatus = {trailerListStatus}
          handleInputDriverPayRates = {handleInputDriverPayRates}
          driverPayRates = {driverPayRates}
          handleImageChange = {handleImageChange}
          
          />
        </TabPane>

        <TabPane tabId={2} className=""  >
          <DocumentsDetails />
        </TabPane>
        <TabPane tabId={3} className="">
        <SchedulePayment/>
        </TabPane>
        <TabPane tabId={4} className="">
        <AdditionalPayee/>
        </TabPane>
      </TabPage>
    </CommonLayOut>
  );
};

export default CreateNewDriverForm;
