import React, { useState } from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row,
 
} from "reactstrap";

import CommonLayOut from "../../../layout";
import CustomerDetails from "./customer_detail/customerDetails";
import CustomerDocuments from "./customer_documents/customerDocuments";
import { TCustomerProps } from "../../../services/tms-objects/customer.types";
import CustomerContacts from "./customer_contacts/customerContacts";
import { toastify } from "../../../features/notification/toastify";

const CreateNewCustomerForm = (props: TCustomerProps ) => {
   
  

  const {
  handleSubmit = undefined,
  customer_id =0,
  } = props

  const [customerActive, setCustomerActive] = useState(1);

  const handleClick = (tabId: number) => {
    if (customer_id > 0) {
      setCustomerActive(tabId);
    } else {
      toastify({
        message: "Please save the Customer details first.",
        type: "error",
      });
    }
  };


  return (
    <>
    <CommonLayOut>
      <Row>
        <div className="page-title">{customer_id == 0 ? "New Customer " : "Edit Customer"}</div>
      </Row>
      <Nav tabs>
        <NavItem>
          <NavLink className={customerActive == 1 ? "active" : ""} onClick={() => handleClick(1)}>
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={customerActive == 2 ? "active" : ""} onClick={() => handleClick(2)}>
            Documents
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={customerActive == 3 ? "active" : ""} onClick={() => handleClick(3)}>
            Contacts
          </NavLink>
        </NavItem>
      </Nav>

      
        {
          {
            1: <CustomerDetails customer_id={customer_id} handleSubmit={handleSubmit} />,

            2: <CustomerDocuments customer_id={customer_id} />,

            3: <CustomerContacts customer_id={customer_id} />,
      
          }[customerActive]
        }

       
    
    </CommonLayOut>

    </>
  );
};

export default CreateNewCustomerForm;
