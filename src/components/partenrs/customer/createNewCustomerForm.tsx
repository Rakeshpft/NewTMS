import React from "react";
import {
  Row,
  TabPane,
} from "reactstrap";

import TabPage from "../../driver-page/tab-page";
import CommonLayOut from "../../../layout";
import CustomerDetails from "./customer_detail/customerDetails";
import CustomerDocuments from "./customer_documents/customerDocuments";
import { TCustomerProps } from "../../../services/tms-objects/customer.types";
import CustomerContacts from "./customer_contacts/customerContacts";

const CreateNewCustomerForm = (props: TCustomerProps ) => {
   
  

  const {
  handleSubmit = undefined,
  customer_id =0,
  } = props


  return (
    <>
      <CommonLayOut>
        <Row className="page-title">
        <div className="page-title">{customer_id == 0 ? "New Customer " : "Edit Customer"}</div>
        </Row>
        <TabPage tabTitles={["Details", "Documents", "Contacts"]} disabledTabs={customer_id === 0 ? [1, 2] : []}>
          <TabPane tabId={0} className="Details">
            <CustomerDetails
                customer_id = {customer_id}
                handleSubmit = {handleSubmit} 
            />
          </TabPane>
          <TabPane tabId={1} className="Documents">
            <CustomerDocuments customer_id={customer_id} />
          </TabPane>
          <TabPane tabId={2} className="Contacts">
            <CustomerContacts 
            customer_id={customer_id}
            />
          </TabPane>
        </TabPage>
      </CommonLayOut>
    </>
  );
};

export default CreateNewCustomerForm;
