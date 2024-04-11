import React from "react";
import { TabPane } from "reactstrap";
import { TtrailerProps } from "../../../../services/tms-objects/trailer.types";
import { TabPage } from "../../../driver-page";
import AnnualInspectionDocuments from "./trailer-documents-tab/trailer-annual-inspection";
import OtherDocuments from "./trailer-documents-tab/trailer-other-documents";
import RegistrationDocuments from "./trailer-documents-tab/trailer-registration";
import RepairsMaintenanceDocuments from "./trailer-documents-tab/trailer-repair-maintenance";




const DocumentsDetails = (prop : TtrailerProps) => {

 const { trailer_id  } = prop
 debugger;

  return (
    <div className="mt-4">
      <TabPage
        tabTitles={[
          "Annual Inspection",
          "Registration",
          "Repairs & Maintenance",
          "Other",
        ]}
      >
        <TabPane tabId={1} className="">
          <AnnualInspectionDocuments
         trailer_id = {trailer_id}
          />
        </TabPane>
        <TabPane tabId={2} className="">
          <RegistrationDocuments 
           trailer_id = {trailer_id}
          />
        </TabPane>
        <TabPane tabId={3} className="">
          <RepairsMaintenanceDocuments 
           trailer_id = {trailer_id}
          />
        </TabPane>
        <TabPane tabId={4} className="">
          <OtherDocuments 
           trailer_id = {trailer_id}
          />
        </TabPane>
        
      </TabPage>
    </div>
  );
};

export default DocumentsDetails;
