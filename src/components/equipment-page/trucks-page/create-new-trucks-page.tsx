import React from "react";
import { useParams } from "react-router-dom";
import CreateNewTruckForm from "./create-new-truck-form";


const CreateNewTruckPage = () => {
  const params = useParams();
  const truck_id = params.id ? parseInt(params.id,10) : 0;
  return(
    <CreateNewTruckForm truck_id={truck_id} />
  );
};

export default CreateNewTruckPage;
