import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import { TVendorProps } from "../../../services/tms-objects/vendor.types";
import VendorDocuments from "./vendor_documents/vendorDocuments";
import VendorDetails from "./vendor_detail/vendorDetails";
import { toastify } from "../../../features/notification/toastify";


  const CreateNewVendorForm = ( props : TVendorProps)=>{
    const{
     vendor_id=0,
     handleSubmit=undefined,
    }= props;

    const [vendorActive, setVendorActive] = useState(1);

  const handleClick = (tabId: number) => {
    if (vendor_id > 0) {
      setVendorActive(tabId);
    } else {
      toastify({
        message: "Please save the Vendor details first.",
        type: "error",
      });
    }
  };



  return (
    <>
    <CommonLayOut>
      <Row className="page-title">
      <div className="page-title">{vendor_id == 0 ? "New Vendor " : "Edit Vendor"}</div>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink className={vendorActive == 1 ? "active" : ""} onClick={() => handleClick(1)}>
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={vendorActive == 2 ? "active" : ""} onClick={() => handleClick(2)}>
            Documents
          </NavLink>
        </NavItem>
       
      </Nav>

        {
          {
            1: <VendorDetails vendor_id={vendor_id} handleSubmit={handleSubmit} />,

            2: <VendorDocuments vendor_id={vendor_id} />,

      
          }[vendorActive]
        }
    
    </CommonLayOut>
    </>
  );
};

export default CreateNewVendorForm;