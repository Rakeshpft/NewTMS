import React from "react";
import { useParams } from "react-router-dom";
import CreateNewVendorForm from "./createNewVendorForm";

const CreateNewVendorPage = () => {
  const param = useParams();
  const vendor_id = param.id == undefined ? 0 : parseInt(param.id,10);
  return (
      <CreateNewVendorForm vendor_id={vendor_id} />
  );
};

export default CreateNewVendorPage;
