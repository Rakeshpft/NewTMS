// import { Form, useNavigate } from "react-router-dom";
// import { routes } from "../routes/routes";
import React from "react";
import { Row, Col, TabPane } from "reactstrap";
import TabPage from "./tab-page";
import DriversDetails from "./createDriver/driversDetails";
import DocumentsDetails from "./createDriver/documentDetailsPage/documentsDetails";
import SchedulePayment from "./createDriver/schedulePayment";
// import AdditionalPayee from "./createDriver/additionalPayee";
import CommonLayOut from "../../layout";
import {  TDriverProps } from "../../services/tms-objects/driver.types";


const CreateNewDriverForm = ( prop : TDriverProps ) => {
   const { 
    handleSubmit = undefined,
    driver_id = 0,
  } = prop


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
        disabledTabs={driver_id===0?[1,2,3]:[]}
      >
        <TabPane tabId={1} className=""   >
          <DriversDetails 
         driver_id={driver_id}
         handleSubmit={handleSubmit}
          
          />
        </TabPane>

        <TabPane tabId={2} className=""  >
          <DocumentsDetails
        driver_id = {driver_id}
          
          />
        </TabPane>
        <TabPane tabId={3} className="">
        <SchedulePayment
          driver_id = {driver_id}
        />
        </TabPane>
        {/* <TabPane tabId={4} className="">
        <AdditionalPayee/>
        </TabPane> */}
      </TabPage>
    </CommonLayOut>
  );
};

export default CreateNewDriverForm;
