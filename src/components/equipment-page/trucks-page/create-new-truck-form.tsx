// 
import React, { useState } from "react";
import {

  Nav,
  NavItem,
  NavLink,
  Row,

} from "reactstrap";
import CommonLayOut from "../../../layout";
 import TruckDetails from "./truck-detail/truck-detail";
 import TruckDocumentForm from "./truck-document/truck-document-detail";
import { toastify } from "../../../features/notification/toastify";


export interface ItruckProps {
  truck_id?: number;
  handleSubmit?: (obj: any) => void;
}


const CreateNewTruckForm = (props: ItruckProps) => {
  const {
    truck_id = 0,
     handleSubmit = undefined
  } = props;

  const [truckActive, setTruckActive] = useState(1);
  
  const handleClick = (tabId: number) => {
    if (truck_id > 0) {
      setTruckActive(tabId);
    } else {
      toastify({
        message: "Please save the truck details first.",
        type: "error",
      });
    }
  };
  
  return (
    <CommonLayOut>
      <Row className="page-title">
      <div className="page-title">{truck_id == 0 ? "New Truck " : "Edit Truck"}</div>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink className={truckActive == 1 ? "active" : ""} onClick={() => handleClick(1)}>
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={truckActive == 2 ? "active" : ""} onClick={() => handleClick(2)}>
            Documents
          </NavLink>
        </NavItem>
      </Nav>

      
        {
          {
            1: <TruckDetails truck_id={truck_id} handleSubmit={handleSubmit} />,
            2: <TruckDocumentForm truck_id={truck_id} />,
      
          }[truckActive]
        }

       
    
    </CommonLayOut>
  )
};

export default CreateNewTruckForm;
