
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
        <TabPage tabTitles={["Detail","Documents"]}>
          <TabPane tabId={1} className="Details">
            <TrailerDetails trailer_id={trailer_id} handleSubmit={handleSubmit} />
            {/* <TrailerDetails

              TrailerNewDetails={TrailerNewDetails}
              handleSaveTrailer={handleSaveTrailer}
              handleInputChange={handleInputChange}
              handleClose={handleClose}
              setTrailerDetails={setTrailerNewDetails}
              selectedTrailer={selectedTrailer}
              title={title}
              setTrailerNewDetails={setTrailerNewDetails}

            /> */}
          </TabPane>
          <TabPane tabId={2} className="Documents">
          </TabPane>
        </TabPage>
        {/* </Form >
      </div> */}
      </CommonLayOut>
    </>
  );
};

export default CreateNewTrailerForm;
