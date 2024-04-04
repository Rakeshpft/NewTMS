import React from "react";
import TabPage from "../../tab-page";
import { TabPane } from "reactstrap";
import DocumentApplication from "./documentSubDetails/documentApplicationPage/documentApplication";
import DocumentCdl from "./documentSubDetails/documentCdlPage/documentCdl";
import DocumentMedical from "./documentSubDetails/documentMedicalPage/documentMedical";
import DocumentDrugTest from "./documentSubDetails/documentDrugTestPage/documentDrugTest";
import DocumentSsn from "./documentSubDetails/documentSsnPage/documentSsn";
import DocumentMvr from "./documentSubDetails/documentMvrPage/documentMvr";
import DocumentEmpVerify from "./documentSubDetails/documentEmpVerifyPage/documentEmpVerify";
import DocumentOther from "./documentSubDetails/documentOtherPage/documentOther";
import { TDriverProps } from "../../../../services/tms-objects/driver.types";




const DocumentsDetails = (prop : TDriverProps) => {

 const { driver_id } = prop


  return (
    <div className="mt-4">
      <TabPage
        tabTitles={[
          "Application",
          "CDL",
          "Medical Card",
          "Drug Test",
          "MVR",
          "SSN Card",
          "Employee Verification",
          "Other",
        ]}
      >
        <TabPane tabId={1} className="">
          <DocumentApplication
         driver_id = {driver_id}
          />
        </TabPane>
        <TabPane tabId={2} className="">
          <DocumentCdl 
           driver_id = {driver_id}
          />
        </TabPane>
        <TabPane tabId={3} className="">
          <DocumentMedical 
           driver_id = {driver_id}
          />
        </TabPane>
        <TabPane tabId={4} className="">
          <DocumentDrugTest 
           driver_id = {driver_id}
          />
        </TabPane>
        <TabPane tabId={5} className="">
          <DocumentMvr 
           driver_id = {driver_id}
          />
        </TabPane>
        <TabPane tabId={6} className="">
          <DocumentSsn />
        </TabPane>
        <TabPane tabId={7} className="">
          <DocumentEmpVerify />
        </TabPane>
        <TabPane tabId={8} className="">
          <DocumentOther />
        </TabPane>
      </TabPage>
    </div>
  );
};

export default DocumentsDetails;
