// 
import React from "react";
import {
  TabPane,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import { TabPage } from "../../driver-page";
 import TruckDetails from "./truck-detail/truck-detail";
 import TruckDocumentForm from "./truck-document/truck-document-detail";

export interface ItruckProps {
  truck_id?: number;
  handleSubmit?: (obj: any) => void;
}


const CreateNewTruckForm = (props: ItruckProps) => {
  const {
    truck_id = 0,
     handleSubmit = undefined
  } = props;

  return (
    <>
      <CommonLayOut>
      <div className="page-title">{truck_id == 0 ? "New Truck " : "Edit Truck"}</div>
        <TabPage tabTitles={["Details", "Documents"]} disabledTabs={truck_id == 0 ? [1]:[]}>
          <TabPane tabId={1} className="Details">
            <TruckDetails truck_id={truck_id} handleSubmit={handleSubmit} />
          </TabPane>
          <TabPane tabId={2} className="Documents">
            <TruckDocumentForm truck_id={truck_id} />
          </TabPane>
        </TabPage>
      </CommonLayOut>
    </>
  );
};

export default CreateNewTruckForm;
