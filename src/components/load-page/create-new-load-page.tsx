import React from "react";
// import CreateNewLoadForm from "./create-new-load-tab";
import { useParams } from "react-router-dom";
import CreateNewLoadTab from "./create-new-load-tab";


const CreateNewLoadPage = () => {
  const param = useParams();
  const load_id = param.id == undefined ? 0 : parseInt(param.id, 10);

  return (
    <>
    
      <CreateNewLoadTab load_id={load_id} />     
    
    </>
  );
};

export default CreateNewLoadPage;
