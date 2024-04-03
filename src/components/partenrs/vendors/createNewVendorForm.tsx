import React from "react";
import {
  TabPane,
} from "reactstrap";
import TabPage from "../../driver-page/tab-page";
import CommonLayOut from "../../../layout";
import { TVendorProps } from "../../../services/tms-objects/vendor.types";
import VendorDocuments from "./vendor_documents/vendorDocuments";
import VendorDetails from "./vendor_detail/vendorDetails";


  const CreateNewVendorForm = ( props : TVendorProps)=>{
    const{
     vendor_id=0,
     handleSubmit=undefined,
    }= props;

  return (
    <>
    <CommonLayOut>
        <div className="page-title">{vendor_id == 0 ? "New Vendor " : "Edit Vendor"}</div>
        <TabPage tabTitles={["Details", "Documents"]} disabledTabs={vendor_id == 0 ? [1]:[]}>
          <TabPane tabId={0} className="Details">
             <VendorDetails vendor_id={vendor_id} handleSubmit={handleSubmit} />
          </TabPane>
          <TabPane tabId={1} className="Documents">
            <VendorDocuments vendor_id={vendor_id} />
          </TabPane>
        </TabPage>
      </CommonLayOut>
    </>
  );
};

export default CreateNewVendorForm;