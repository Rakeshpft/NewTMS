
import React from "react";
import {
  TabPane,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import { TabPage } from "../../driver-page";
import TrailerDetails from "./trailer-detail/trailer-detail";
import DocumentsDetails from "./trailer-documents/trailer-document-detail";

export interface ITrailerProps {
  trailer_id?: number;
  handleSubmit?: (obj: any) => void;
}


const CreateNewTrailerForm = (props: ITrailerProps) => {
  const {
    trailer_id = 0,
    handleSubmit = undefined
  } = props;
debugger;
  
  return (
    <>
    
      <CommonLayOut>
        <div className="page-title">{trailer_id == 0 ? "New Trailer " : "Edit Trailer"}</div>
        <TabPage
          tabTitles={[
            "Details",
            "Documents",
          ]}
          disabledTabs={trailer_id === 0 ? [1, 2, 3] : []}
        >
          
          <TabPane tabId={1} className="Details">
            <TrailerDetails trailer_id={trailer_id} handleSubmit={handleSubmit} />
          </TabPane>
          <TabPane tabId={2} className="Documents">
            <DocumentsDetails trailer_id={trailer_id} />
          </TabPane>



        </TabPage>
      </CommonLayOut>
    </>
  );
};

export default CreateNewTrailerForm;
