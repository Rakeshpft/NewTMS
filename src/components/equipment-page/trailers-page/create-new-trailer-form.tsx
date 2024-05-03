
import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import TrailerDetails from "./trailer-detail/trailer-detail";
import DocumentsDetails from "./trailer-documents/trailer-document-detail";
import { toastify } from "../../../features/notification/toastify";

export interface ITrailerProps {
  trailer_id?: number;
  handleSubmit?: (obj: any) => void;
}


const CreateNewTrailerForm = (props: ITrailerProps) => {
  const {
    trailer_id = 0,
    handleSubmit = undefined
  } = props;

  const [trailerActive, setTrailerActive] = useState(1);

  const handleClick = (tabId: number) => {
    if (trailer_id > 0) {
      setTrailerActive(tabId);
    } else {
      toastify({
        message: "Please save the Trailer details first.",
        type: "error",
      });
    }
  };
  
  return (
    <>
    
      <CommonLayOut>
      <Row className="page-title">
      <div className="page-title">{trailer_id == 0 ? "New Trailer " : "Edit Trailer"}</div>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink className={trailerActive == 1 ? "active" : ""} onClick={() => handleClick(1)}>
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={trailerActive == 2 ? "active" : ""} onClick={() => handleClick(2)}>
            Documents
          </NavLink>
        </NavItem>
       
      </Nav>

        {
          {
            1: <TrailerDetails trailer_id={trailer_id} handleSubmit={handleSubmit} />,

            2: <DocumentsDetails trailer_id={trailer_id} />,

      
          }[trailerActive]
        }
    
    </CommonLayOut>



    </>
  );
};

export default CreateNewTrailerForm;
