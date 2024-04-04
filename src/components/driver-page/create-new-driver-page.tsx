import React from "react";

import CreateNewDriverForm from "./createNewDriverForm";
import { useParams } from "react-router-dom";

const CreateNewDriverPage = () => {
  const param = useParams();
  const driver_id = param.id == undefined ? 0 : parseInt(param.id, 10);

  return (
    <>
      <CreateNewDriverForm driver_id={driver_id} />
    </>
  );
};

export default CreateNewDriverPage;
