
import React from "react";
import {
  TabPane,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import { TabPage } from "../../driver-page";
import TrailerDetails from "./trailers_deatil/trailerDetails";

export interface ITrailerProps {
  trailer_id?: number;
  handleSubmit?: (obj: any) => void;
}


const CreateNewTrailerForm = (props: ITrailerProps) => {
  const {
    trailer_id = 0,
    handleSubmit = undefined
  } = props;

  return (
    <>
      <CommonLayOut>
      <div className="page-title">{trailer_id == 0 ? "New Trailer " : "Edit Trailer"}</div>
        <TabPage tabTitles={["Details", "Documents"]} disabledTabs={trailer_id == 0 ? [1]:[]}>
          <TabPane tabId={1} className="Details">
            <TrailerDetails trailer_id={trailer_id} handleSubmit={handleSubmit} />
          </TabPane>
          <TabPane tabId={2} className="Documents">
          </TabPane>
        </TabPage>
      </CommonLayOut>
    </>
  );
};

export default CreateNewTrailerForm;
