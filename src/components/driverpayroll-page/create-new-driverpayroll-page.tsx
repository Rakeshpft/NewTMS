import React from "react";
import CreateNewDriverPayroll from "./create-new-driverpayroll-page/createNewDriverPayroll";
import { useParams } from "react-router-dom";


const CreateNewDriverPayrollPage = () => {
  const params = useParams();
  const settlement_id = params.id ? parseInt(params.id,10) : 0;
  return (
    <>
      <CreateNewDriverPayroll settlement_id={settlement_id} />
    </>
  );
};

export default CreateNewDriverPayrollPage;
